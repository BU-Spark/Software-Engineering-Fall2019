//These are types we define so that we can use them elsewhere when dealing with the API.
type Question = { 
    ID: string  
    authorID: User
    creationTime: Date
    isPrivate: Boolean
    questionContent: string
    responses: QuestionResponse[]
}

type QuestionResponse = {
    ID: String
    authorID: User
    creationTime: Date
    responseCon
    content: string
}

type User = {
    ID: String
    firstName: String
    lastName: String
    favicon: String
    isAnon: Boolean
    email: String
}







