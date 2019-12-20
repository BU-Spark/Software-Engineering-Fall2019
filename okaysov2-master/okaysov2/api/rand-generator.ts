//The bascs of how we would generate random usernames and passwords
const uuidv4 = require('uuid/v4');
export var uuidRand=uuidv4();
export var passRand=uuidv4();

//Source:https://www.npmjs.com/package/uuid
//Changes: put what version 4 returns into variables
//License: MIT 