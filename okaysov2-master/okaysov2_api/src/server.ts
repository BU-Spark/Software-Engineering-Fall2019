import http from "http";
import express from "express";
import dotenv from 'dotenv'
import { applyMiddleware, applyRoutes } from "./utils";
import * as middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import * as routes from "./services";
import helmet from 'helmet'

//Setup env file
let result = dotenv.config();
if (result.error) {
  throw result.error
}
process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const router = express();
//Apply some basic security settings via Helmet
router.use(helmet())
//Body parser
router.use(express.urlencoded({extended: true}))

//All routes get this middleware
applyMiddleware(middleware.basicMiddle, router);
//Apply the unsecured routes
applyRoutes(routes.unsecuredRoutes, router);
//Now apply the authentication middleware 
applyMiddleware(middleware.authMiddle, router)
//Now apply the secure routes. 
//? I have no idea why it has to be done in this order. 
//? The only downside is that routes that don't exist get caught by the auth middleware before the HTTP error middleware, which is less than ideal
applyRoutes(routes.securedRoutes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;


const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
