import { Request, Response, NextFunction } from "express";
import { checkSighnupParams, checkUserNotExists } from './authChecks'
import { createUserAsync } from './authUtils'
export default [
  {
    path: "/api/signup",
    method: "post",
    handler: [
      checkSighnupParams,
      checkUserNotExists,
      async (req: Request, res: Response, next: NextFunction) => {
        //Create a user
        var { psw, email, fname, lname } = { psw: req.body.psw, email: req.body.email, fname: req.body.fname, lname: req.body.lname }
        const token = await createUserAsync(email, psw, fname, lname)
        res.status(200).send({token: await token});
      }
    ]
  }
];





