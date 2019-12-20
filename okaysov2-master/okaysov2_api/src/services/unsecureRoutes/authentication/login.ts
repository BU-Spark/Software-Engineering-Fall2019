import { Request, Response } from "express";
import { checkLoginParams, checkUserExists } from './authChecks'
import { genStoreToken, verifyUserPassword } from './authUtils'
import { HTTP406Error } from '../../../utils/httpErrors'

export default [
  {
    path: "/api/login",
    method: "post",
    handler: [
      checkLoginParams,
      checkUserExists,
      async ({ body }: Request, res: Response) => {
        let {email, password} = {email: body.email, password: body.psw}
        const result = verifyUserPassword(email, password)
        if (await result == true) {
            //Valid Password, return a token
            const token = genStoreToken(email)
            res.status(200).send({token: await token})
        }else{
          throw new HTTP406Error("Invalid Login Credentials")
        }
      }
    ]
  }
]