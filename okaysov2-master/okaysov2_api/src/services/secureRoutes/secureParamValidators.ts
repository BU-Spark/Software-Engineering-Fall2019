import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../../utils/httpErrors";

export const checkUserRequestParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.id) {
    throw new HTTP400Error("Missing ID Param!");
  } else {
    next();
  }
};

export const checkSingleQuestionRequestParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.body.qid){
    throw new HTTP400Error("Missing qid Param!");
  }else{
    next();
  }
}

