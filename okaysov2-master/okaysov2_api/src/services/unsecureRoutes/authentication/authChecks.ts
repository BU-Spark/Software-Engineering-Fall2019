import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../../../utils/httpErrors";
import { prisma } from '../../../../generated/prisma-client'
import validator from 'validator'
import { minPasswordLen, maxPasswordLen, minNameLen, maxNameLen } from '../../../utils/defaults'

//Checks if all the params exist for logging in
export const checkLoginParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    var { email, psw } = { email: req.body.email, psw: req.body.psw }
    if ((email == undefined || psw == undefined)) { //If it's not an email and or the password is too short/empty
        throw new HTTP400Error("Missing Params");
    } if (isValidEmail(email) && isValidPassword(psw) ) {
        next();
    } else {
        throw new HTTP400Error("Invalid Params")
    }
};

//Check that params exist for signup route
export const checkSighnupParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //We require the following
    //email, password, first name, last name
    const qPassword = req.body.psw;
    const qEmail = req.body.email;
    const qFName = req.body.fname;
    const qLName = req.body.lname;
    const allParams = [qPassword, qEmail, qFName, qLName]
    //Make sure received the params
    if (!(allParams.every(item => item != undefined))) {
        throw new HTTP400Error("Missing sign up param")
    } if (isValidPassword(qPassword) && isValidEmail(qEmail) && isValidName(qFName) && isValidName(qLName)) {
        next()
    } else {
        throw new HTTP400Error("Param Error")

    }
}

export const checkUserNotExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    const qEmail = req.body.email

    const userExists = await prisma.$exists.user({ email: qEmail })
    if(!userExists){
        next()
    }else{
        throw new HTTP400Error("User Already Exists!")
    }
}

//Checks if the specified user exists in the database
export const checkUserExists = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //Check for user ID in the database
    const qEmail = req.body.email
    const userExists = prisma.$exists.user({ email: qEmail })
    if (userExists) {
        next();
    } else {
        throw new HTTP400Error("User does not exist!")
    }
};

//Check if the input password meets the requirements 
function isValidPassword(input: string): boolean {
    if (validator.isLength(input, { min: minPasswordLen, max: maxPasswordLen })) {
        return true;
    } else {
        return false;
    }
  }
  
  function isValidEmail(input: string): boolean {
    if (validator.isEmail(input)) {
        return true;
    } else {
        return false;
    }
  }
  
  function isValidName(input: string): boolean {
    if (validator.isLength(input, { min: minNameLen, max: maxNameLen })) {
        return true;
    } else {
        return false;
    }
  }