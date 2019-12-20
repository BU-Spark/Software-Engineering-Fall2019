import { Request, Response } from "express";
import { checkSingleQuestionRequestParams } from './secureParamValidators'
import { prisma } from '../../../generated/prisma-client'
import { Question } from "../../utils/interfaces";
import { HTTP404Error } from "../../utils/httpErrors";


export const getQuestion =  [
  {
    path: "/api/question",
    method: "get",
    handler: [
      checkSingleQuestionRequestParams,
      async ({ body }: Request, res: Response) => {
        res.status(200).send(await _retrieveQuestion(body.qid))
      }
    ]
  }
];

//Gets the question from the DB
async function _retrieveQuestion(id: string){
  //Get the group and author of the requested question
  const fragment =
  `fragment questionWRes on Question {
    id
    userID {
      id
  }
  isPrivate
  expertGroup{
      id
  }
  questionContent
  questionResponses{
    id
    authorUserID{
      id
    }
    responseContent
    createdAt
  }
  createdAt
  }`
  //Get the question from the DB and make it into our interface
  const question: Question = await prisma.question({id: id}).$fragment(fragment)
  //Throw an error if the question is not found. Although this should have already been cought....
  if(question == undefined){
    throw new HTTP404Error("Question not found..")
  }
  return question
}

