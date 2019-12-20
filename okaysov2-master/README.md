# Okayso

Okayso is an app that gives users access to experts to get support and information about topics like sex and mental health that can be difficult to discuss. 

# Our Goals

The goal of our project was to implement a new wireframe of the app for user testing. Previously the only way to access experts and users' questions was to log-in, out client found that some users might want an Anonymous feature so that their identity is fully secure when asking and viewing questions. We implemented this feature and a new recent questions feed where users could see other people's public questions - the idea is that this will promote users to go to the app even when they don't have a question and if a question has already been asked users can see that. 
# Frontend Setup
##  Pre-Reqs

* Expo 35.0.0 (Comes with Package.json)
* Expo-cli 3.7.1 (Comes with Package.json)
* Node 10.17.0 (Must be this version)
* VS Code Recommended(Or another TS compatible editor)

##  Install

1. Clone Repo
2. Navigate to the folder that contains App.tsx in `~/okaysov2/okaysov2`
3. Run `npm install`
4. Run `npm start`
5. Code!
6. Use your favorite method to run the Expo App

## Testing

**Problem:**
We currently fail the tests due to an issue in a library supplied through NPM, namely mobx

Testing has been implemented with Jest, a framework that supports unit, components and "snapshot" testing. As of right now, only basics tests exist, basically a super angry linter that also compiles your code to ensure there are no obvious issues. 

## How to run tests

Simply run `npm test` which will fire off all the tests

## CI Tests

CI is setup utilizing Travis CI on the git repo. Whenever you push stuff to a branch or create a PR a build is run and it will let you know if it succeeded or not. This status is integrated back into PRs so that you can see it on the same page too.
***
# Backend initialization

## Overview 

The backend is built an ORM called Prisma that uses MySQL as it's supporting database. Then, a rest API written in NodeJS + Express is used to expose the data securely over standard HTTP request. Authentication is done using JWT tokens but not in a stateless manner, that is to say that it still checks the DB to see if the received token is valid. This allows us to de-authenticate clients immediately instead of waiting for the token to expire. 

## Where the API is used in the App

Currently, not all the visual features of the app that display data actually pull from the API. Most screens actually pull from static JSON files that are assets of the app. To see a demonstration of pulling data from the API you must go to the following route:

`Load App -> See Other Conversations -> Feed`

This feed of `Recent Questions` is loaded from the database, if you click on a question it will not load that particular conversation from the database. This part of the frontend backend connection was not made simply due to time restrictions. Again, **only** the `Recent Questions` screen on this route is pulling data from the API. 

## How To Build The API

#### Dependencies:

* Docker V3
* Your favorite tool for attaching to Docker containers

### Steps: 

* Clone the repo
* CD into the `~okaysov2/okaysov2_api` folder
* Create a .env file with the following properties
    * `JWT_SECRET=<your secret>`
* Run `docker-compose up` in your terminal
* Wait for the images to download and build. 
* Once all three containers have been built you will will see some errors coming from the API container. 
* Now you need to attach a shell to the `okaysov2_api` container and run the following commands to generate the necessary client code.  
    * `prisma deploy`
    * `prisma generate`
* Shutdown the containers and bring them back up with `docker-compose up`
    * It sometimes takes a few times of restarting the `okaysov2_API` container to get it come up correctly.
    * If all else fails, often running `npm install` locally fill fix the issue.
* Wait for everything to come online, you should see the following status message from the API container
    * `Server is running http://localhost:3000...`
* Once the server is up and runnig you can use the server
* Bash back into the `okaysov2_api` container and run the following command
    * `ts-node load_data.ts`
* Example data has now been loaded into the database

## Docker Container Breakdown

All of this lives in three Docker containers that can be managed using docker-compose. The three containers are as follows: 
1. okaysov2_API - Runs the NodeJS server
2. Prisma - Runs the prisma server
3. mySql - Runs the MySQL server for prisma.


## Route Breakdown
 * /api/recentquestions
   * Returns a list of the 15 most recent public questions in raw JSON
 * /api/question
   * Request a single public/private questions by ID. Requires authorization token, returns raw JSON
 * /api/login
   * Requires `email` and `psw` passed in the body. Returns a token
 * /api/signup
   * Requires `lname,fname,email,psw` passed in the body. Returns a token


## Security Details

All 'secure' route requests require a token that is verified by the authentication middleware, to obtain a token users need to either sign up or login, both functions return a the generated token which then needs to be passed in the Authorization header as a bearer token to authenticate. 

In addition, we check for authorization ie, permissions. The server checks the question that is requested see if it matches any of the following parameters, if it passes any one of these checks it will allow the middleware to continue, otherwise it throws an error. .
1. The requester is the author of the question
2. Both the question and the requester are in the same expert group
3. The question is public.

## Data Return

All data is returned in the body of the response as raw JSON

## Security Concerns for deployment

This is a purely development back end right now, although it has authentication and authorization it is not ready to be deployed for a few reasons. A non-complete list is below: 
* Does not communicate over HTTPS
* No DDOS protection
* No bot scraping protection
* No request limiting
* Prisma endpoint protection has NOT been enabled, this allows un-altered access to the DB. Great for developing, detrimental for security!

## Features that function

The following features have been implemented fully and could be used by a properly configured client app. 

* Login
* Signup
* Retrieve recent questions
* Retrieve a single public question by ID
* Retrieve a single question (Public or private, with authorization)

## Features that do not function/exist

The following have either only barely been implemented or have not been written altogether. 

* Ability to post response
* Ability to post question
* Ability to create anonymous account
* Ability to make question private
* Most expert related features. 

***
# Known Bugs

* The keyboard obscures the text input field when sending a response in 'Chat' screens. Both in private and public viewing modes. 
* The design is not currently responsive, abnormal screen sizes or DPI/Scaling settings will cause non-consistent UI shapes and sizes. 
* Missing back button on the Login and Sign Up page(ie, users cannot back out once they've hit this screen)
* The `signout button` appears on the screens even when the users are not signed in (accountless) because some screens are used in both cases where a user is signed in with an account and accountless.
    - The `signout button` currently takes the user to the 'Welcome' screen.
*  Feed and Expert Screens are placeholder screens because they are already existing screens in the current version of the app, therefore did not need to be rebuilt.

# Conclusions

We decided to build the app from scratch using React Native and implement only the features that the client wanted (relatively no repeats between the existing app and ours). This was done because it was very difficult to get the client's code base to run and we thought it would be easier and better for development if we chose our own stack and built our own app. In hindsight it would have been better if we spent more time with the client's code base and managed to understand/run it - this would have enabled us to work on newer features quicker rather than worry about setting up navigation and implementing a lot of front end UI that already existed in the previous app. 

