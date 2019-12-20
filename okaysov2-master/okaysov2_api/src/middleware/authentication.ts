import { Request, Response } from "express";
import { HTTP500Error, HTTP406Error, HTTP400Error, HTTP404Error } from '../utils/httpErrors'
import { NextFunction } from "connect";
import { Router } from 'express'
import { prisma } from '../../generated/prisma-client'
import jwt from 'jsonwebtoken'
import { tokenArgs } from '../utils/defaults'

//You're who you say you're 
export const verifyIdentity = (router: Router) => {
    router.use(async (req: Request, res: Response, next: NextFunction) => {
        const parsedToken = await _parseVerifyToken(req)
        if (parsedToken == undefined) {
            throw new HTTP406Error("Invalid token")
        }
        //Get user token from the DB
        const fragment =
            `fragment tokenInfo on User {
            token {
              tokenVal
                }
            }`
        //These are used to help convert the JSON into a typed object
        interface Token {
            token: {tokenVal: string}
        }
        //Then forces it into the type/interface we have defined
        const storedToken: Token = await prisma.user({ email: parsedToken.userid }).$fragment(fragment)
        if (storedToken == null) {
            throw new HTTP406Error("Invalid Token")
        } else {
            if (storedToken.token.tokenVal == parsedToken.tokenVal) {
                next()
            } else {
                throw new HTTP406Error("Invalid Token")
            }
        }
    })
}

//You can do what you desire to do
export const verifyPermissions = (router: Router) => {
    router.use(async (req: Request, res: Response, next: NextFunction) => {
        if (req.method == "GET") {
            //Requesting something from the server
            const elm = await _verifyGETPermission(req)
            if (elm == undefined) {
                throw new HTTP400Error("Permission parsing issue")
            }
            if (elm) {
                next()
            } else {
                throw new HTTP400Error("You do not have permissions to view this question")
            }

        } else {
            throw new HTTP400Error("This is not supported yet!")
        }
    })
}
//Take a question ID and a token and determine if this user is allowed to perform the request operation
async function _verifyGETPermission(req: Request) {
    if (req.method != "GET") {
        throw new HTTP500Error("This is a not a GET request")
    }
    //Some types we will use later
    interface qInfo {
        userID: { email: string }
        expertGroup: { id: string }
        isPrivate: boolean
    }
    const qid = req.body.qid
    if (qid == undefined) {
        throw new HTTP400Error("Missing Question Request ID")
    } else {
        const tokenVal = await _parseVerifyToken(req)
        if (tokenVal == undefined) {
            throw new HTTP406Error("Invalid Token")
        }
        //Get the group and author of the requested question
        const fragment =
            `fragment questionInfo on Question {
        userID {
            email
        }
        isPrivate
        expertGroup{
            id
        }
        }`

        //Get the question from the DB and make it into our interface
        const question: qInfo = await prisma.question({ id: qid }).$fragment(fragment)
        //Question not found at all
        if (question == undefined) {
            throw new HTTP404Error("Question not found!")
        }
        //Some values missing
        if (Object.values(question).every(val => val != undefined)) {
            //The question is anon, anyone can read it
            if (!question.isPrivate) {
                return true
            }
            //It is the user's own question
            if (question.userID.email == tokenVal.userid) {
                return true
            }
            //If the user is in the group that this question belongs to
            if (tokenVal.expertGroups.includes(question.expertGroup.id)) {
                return true
            }
        } else {
            throw new HTTP404Error("Question not found...")
        }

    }
    //Catch all for de-authorization
    return false

}
//In case we need to do more in the future, we parse it in a separate function
async function _parseVerifyToken(header: Request) {
    const token = String(header.headers.authorization).split(" ")[1]
    type tokenVals = {
        userid: string,
        iat: number,
        exp: number
        isAnon: boolean,
        expertGroups: string[]
        tokenVal: string
    }
    if (process.env.JWT_SECRET == undefined) {
        throw new HTTP500Error("You did not specify the JWT secret in the .env")
    } else {
        try {
            var decoded = await jwt.verify(token, process.env.JWT_SECRET)
            if (Object.keys(decoded).every(elm => tokenArgs.includes(elm))) {
                //Valid token with all params
                let parsedToken = decoded as tokenVals
                parsedToken.tokenVal = token
                return parsedToken
            }
        } catch (error) {
            throw new HTTP406Error("Invalid Token")
        }
    }
    return undefined
}

export const checkSearchParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.q) {

    } else {
        next();
    }
};
