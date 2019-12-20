import * as Example from './placeholderQuestions.json'
import { IMessage } from 'react-native-gifted-chat'
import { Question, QuestionResponse, User } from './apiTypes'
import { } from 'react-native-gifted-chat'
//This is a wrapper that is used for interacting with the API
//Right now it just pulls data from a JSON file


//These are purely for testing until we have a true backend in place. 
function getRandomID() {
    let max = Example.Questions.length
    let min = 1
    let questionNumber = Math.floor(Math.random() * max - min + 1) + min
    return questionNumber

}

//A function to build questions from the JSON
function buildQuestionResponse(ID: string): QuestionResponse[] {

    let responsesList: QuestionResponse[] = []
    let qid = parseInt(ID)

    Example.Questions[qid].responses.forEach(element => {

        let tempU: User = {
            ID: "123456",
            email: "test@example.org",
            favicon: "",
            firstName: element.author,
            lastName: "",
            isAnon: false,
            sessionExp: new Date(Date.now()),
            sessionKey: "SES_KEY"
        }

        let tempR: QuestionResponse = {
            ID: "123445",
            authorUser: tempU,
            creationTime: new Date(Date.now()),
            responseContent: element.content
        }

        responsesList.push(tempR)
    });

    return responsesList
}


//These are real functions but right now they only return static data. 
export function getQuestionByQuestionID(ID: string): Question {
    //Returns a question based on the id 

    //Placeholder stuff
    //Pick a random question to get between 1 and length of example data(inclusive)
    var qid = getRandomID()
    var user: User = {
        ID: "123456",
        email: "test@example.org",
        favicon: "",
        firstName: "Example",
        lastName: "User",
        isAnon: false,
        sessionExp: new Date(Date.now()),
        sessionKey: "SES_KEY"
    }
    var tempQ: Question = {
        ID: qid.toString(),
        questionContent: Example.Questions[qid].question,
        authorUser: user,
        creationTime: new Date(Date.now()),
        isPrivate: false,
        responses: []
    }

    return tempQ
}

//Returns a question with the responses in a list on the object
//Example usage getQuestionWithResponsesByID("2").responses[1].responseContent
//This gets the question of ID 2, then response 1 and its respective content. 
export function getQuestionWithResponsesByID(ID: string): Question {
    //returns a question with the list of responses 


    //Placeholder stuff
    //Parse the id given, to make sure we return the correct response content
    let qid = parseInt(ID);
    let user: User = {
        ID: "123456",
        email: "test@example.org",
        favicon: "",
        firstName: "Example",
        lastName: "User",
        isAnon: false,
        sessionExp: new Date(Date.now()),
        sessionKey: "SES_KEY"
    }
    //Create list of responses


    var tempQ: Question = {
        ID: qid.toString(),
        questionContent: Example.Questions[qid].question,
        authorUser: user,
        creationTime: new Date(Date.now()),
        isPrivate: false,
        responses: buildQuestionResponse(ID)
    }

    return tempQ

}


//Get all the users question, pass their user ID to return a a list of their question
export function getUserQuestions(userID: String): Question[] {
    var qList: Question[] = []
    var user: User = {
        ID: userID,
        email: "test@example.org",
        favicon: "",
        firstName: "Example",
        lastName: "User",
        isAnon: false,
        sessionExp: new Date(Date.now()),
        sessionKey: "SES_KEY"
    }
    for (let i = 0; i < 4; i++) {
        var tempQ: Question = {
            ID: i.toString(),
            authorUser: user,
            creationTime: new Date(Date.now()),
            isPrivate: false,
            questionContent: Example.Questions[i].question,
            responses: []
        }

        qList.push(tempQ)
    }

    return qList


}


//Returns a list of recent questions
export function getRecentQuestions(): Question[] {

    var qList: Question[] = []
    var user: User = {
        ID: "123456",
        email: "test@example.org",
        favicon: "",
        firstName: "Example",
        lastName: "User",
        isAnon: false,
        sessionExp: new Date(Date.now()),
        sessionKey: "SES_KEY"
    }
    for (let i = 0; i < Example.Questions.length; i++) {
        var tempQ: Question = {
            ID: i.toString(),
            authorUser: user,
            creationTime: new Date(Date.now()),
            isPrivate: false,
            questionContent: Example.Questions[i].question,
            responses: []
        }

        qList.push(tempQ)
    }


    return qList


}
//Gets an entire array of question + all possible responses in the format needed for the chat interface
export function getIMessageArray(ID: string): IMessage[] {
    let ResponseLength;
    let CurrResponse;
    let ResponseID: number[] = [];
    let isexpert: number[] = [];
    let tempResponse = getQuestionWithResponsesByID(ID);
    let firstQuestion: IMessage = {
        _id: 0,
        text: tempResponse.questionContent,
        createdAt: tempResponse.creationTime,
        user: {
            _id: 1,
            name: JSON.stringify(tempResponse.authorUser),
            avatar: 'https://placeimg.com/140/140/any'
        }

    };
    let messages: IMessage[] = []

    ResponseLength = (tempResponse.responses).length;

    for (let i = 1; i < ResponseLength + 1; i++) {
        ResponseID[i] = i; //test function to get diff IDs
    }

    //A function to generate IDs for the messages. 
    for (let i = 0; i < ResponseLength + 1; i++) {

        if (i % 2 == 0) {

            isexpert[i] = 0;

        }
        else {
            isexpert[i] = 1;
        }
    }


    for (let i = ResponseLength - 1; i > 0 && i < ResponseLength; i--) {
        CurrResponse = JSON.stringify(tempResponse.responses[i].responseContent);
        //get rid of quotes
        CurrResponse = CurrResponse.substring(1, CurrResponse.length - 1)
        messages.push({
            _id: ResponseID[i],
            text: CurrResponse,
            createdAt: tempResponse.responses[i].creationTime,
            user: {
                _id: isexpert[i],
                name: JSON.stringify(tempResponse.authorUser),
                avatar: 'https://placeimg.com/140/140/any'
            }
        });
    }

    messages.push(
        firstQuestion
    )

    return messages;
}