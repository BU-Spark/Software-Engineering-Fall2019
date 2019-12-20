import { prisma } from '../../../../generated/prisma-client'
import bcyrpt from 'bcryptjs'
import { HTTP500Error, HTTP400Error, HTTP406Error } from '../../../utils/httpErrors'
import jwt from 'jsonwebtoken'
import { JWTTokenLife, tokenArgs, hashRounds } from '../../../utils/defaults'
import bcrypt from 'bcryptjs'
//Controlls how many rounds are used for password hashing


export async function createUserAsync(email: string, password: string, firstName: string, lastName: string) {
  try {

    const hashed = hashPasswordAsync(password)
    const user = await prisma.createUser({ email: email, password: await hashed, firstName: firstName, lastName: lastName, avatar: '' })
    const token = await genStoreToken(user.email)
    return token
    //return newUser
  } catch (error) {
    throw new HTTP500Error("There was an error while creating the user")
  }
}


//A function to hash the password 
export async function hashPasswordAsync(password: string) {
  let finalHash
  let salt = bcyrpt.genSalt(hashRounds);
  finalHash = bcyrpt.hash(password, await salt)
  return finalHash
}

async function genToken(id: string) {
  //Check for env file first
  if (process.env.JWT_SECRET == undefined) {
    throw new HTTP500Error("You did not specify the JWT_SECRET in the .env file")
  }
  //Retrieves this users permissions
  const fragment =
    `fragment userInfo on User {
    isAnon
    expertGroups {
      id
    }
  }`
  type UserInfo = {
    isAnon: Boolean,
    expertGroups: String[]
  }

  const userInfo = await prisma.user({ email: id }).$fragment(fragment) as UserInfo
  return jwt.sign({ userid: id, isAnon: userInfo.isAnon, expertGroups: userInfo.expertGroups }, process.env.JWT_SECRET, { expiresIn: JWTTokenLife })
}

//A function to generate and store a token on the user object in the DB
//Expects the user to exist, throws an error otherwise. 
export async function genStoreToken(id: string) {
  //Generate and store a token
  if (process.env.JWT_SECRET == undefined) {
    throw new HTTP500Error("You did not specify the JWT secret in the .env")
  }
  //Get the expiration out of the token so that we can set it in the DB
  let tempToken = genToken(id)
  let decodedToken = await jwt.verify(await tempToken, process.env.JWT_SECRET)
  if (Object.keys(decodedToken).every(elm => tokenArgs.includes(elm))) {
    //JWT token has all the keys
    let vals = Object.values(decodedToken)
    var { iat, exp } = { iat: vals[Object.keys(decodedToken).indexOf('iat')], exp: vals[Object.keys(decodedToken).indexOf('exp')] }
  }else{
    throw new HTTP400Error("Invalid Token")
  }
  //Upsert token into DB 
  if (!(prisma.$exists.user({ email: id }))) {
    throw new HTTP400Error('Auth Error')
  } else {
    const dbTokenID = await prisma.createToken({ exp: exp, iat: iat, tokenVal: await tempToken })
    //Replace whatever(if any) is in the user object
    await prisma.updateUser({
      data: {
        token: {
          connect: { id: dbTokenID.id },
        }
      },
      where: {
        email: id
      }
    })
  }
  return tempToken
}

//Verify the password against what it stored in the database
//Assume the params exist on the request 
export async function verifyUserPassword(email: string, password: string) {

  const qPassword = password
  const qEmail = email
  const dPassword = await prisma.user({ email: qEmail })
  if (dPassword != null) {
    return bcrypt.compare(qPassword, dPassword.password)
  } else {
    throw new HTTP406Error("Invalid Login Credentials")
  }
}