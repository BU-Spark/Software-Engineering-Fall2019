import { Request, Response } from "express";
import { prisma } from '../../../generated/prisma-client'
import { RecentQuestions } from "../../utils/interfaces";




export const getRecentQuestions = [
    {
      path: "/api/recentquestions",
      method: "get",
      handler: [
        async ({ body }: Request, res: Response) => {
          res.status(200).send(await _retrieveRecentQuestions())
        }
      ]
    }
  
  ]

async function _retrieveRecentQuestions() {
    //Get the group and author of the requested question
    const fragment =
    `fragment recentQuestionInfo on Question {
      id
      userID {
        id
    }
    isPrivate
    expertGroup{
        id
    }
    questionContent
    createdAt
    }`
    const recentq: RecentQuestions[] = await prisma.questions({
      where: {isPrivate: false},
      orderBy: 'createdAt_DESC',
      first: 15
    }).$fragment(fragment)
    return recentq
  }