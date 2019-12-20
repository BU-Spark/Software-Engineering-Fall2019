export type Question = {
    ID: string
    authorUser: User
    creationTime: Date
    isPrivate: Boolean
    questionContent: string
    responses: QuestionResponse[]
}

export type QuestionResponse = {
    ID: String
    authorUser: User
    creationTime: Date
    responseContent: string
}

export type User = {
    ID: String
    firstName: String
    lastName: String
    email: String
    favicon: String
    isAnon: Boolean
    sessionKey: String
    sessionExp: Date
}
