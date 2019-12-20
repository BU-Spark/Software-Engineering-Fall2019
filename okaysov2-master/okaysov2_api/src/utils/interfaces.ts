
export interface Question {
  id: string,
  userID: string,
  questionContent: string,
  questionResponses: Response[]
  isPrivate: boolean,
  expertGroup: string,
  createdAt: string,

}

export interface Response {
    id: string
    authorUserID: {id: string}
    responseContent: string
    createdAt: string
    updatedAt: string
}

export interface RecentQuestions { 
  id: string
  userID: {id: string}
  isPrivate: boolean
  expertGroup: {id: string}
  questionContent: string
  createdAt: string
}