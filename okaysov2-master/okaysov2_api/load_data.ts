import axios from 'axios'
import { stringify } from 'querystring'
import { prisma } from './generated/prisma-client/index'

async function createUser() {
    try {
        const url = "http://localhost:3000/api/signup"
        const requestBody =
            { lname: "doe", fname: "jon", email: "jondoe@gmail.com", psw: "nohacks" }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios.post(url, stringify(requestBody), config)
            .then((result) => {
                // Do somthing
            })
            .catch((err) => {
                // Do somthing
            })
    }
    catch{
        console.log("Err")
    }
}

async function createQuestion() {

    try {
        await prisma.createQuestion({
            expertGroup: { create: { name: "Example Expert Group" } },
            isPrivate: false,
            key: "A key",
            questionContent: "I've been struggling recently with...react native ",
            userID: { connect: { email: "jondoe@gmail.com" } }

        })
       await prisma.createQuestion({
            expertGroup: { create: { name: "Example Expert Group" } },
            isPrivate: false,
            key: "A key",
            questionContent: "How can I know if someone likes my code?",
            userID: { connect: { email: "jondoe@gmail.com" } }

        })
        await prisma.createQuestion({
            expertGroup: { create: { name: "Example Expert Group" } },
            isPrivate: false,
            key: "A key",
            questionContent: "I have been struggling recently....",
            userID: { connect: { email: "jondoe@gmail.com" } }

        })
        await prisma.createQuestion({
            expertGroup: { create: { name: "Example Expert Group" } },
            isPrivate: false,
            key: "A key",
            questionContent: "I wonder if my code has become s",
            userID: { connect: { email: "jondoe@gmail.com" } }

        })


    } catch (err) {
        console.log(err)
        console.log("Error creating example data, please try again")

    }
}
console.log(createUser())
console.log(createQuestion())