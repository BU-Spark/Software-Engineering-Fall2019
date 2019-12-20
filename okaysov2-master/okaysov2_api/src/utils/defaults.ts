//A central file to hold default values
export const minPasswordLen = 6;
export const maxPasswordLen = 64;
export const saltRounds = 10;
export const minNameLen = 2;
export const maxNameLen = 16;
export const hashRounds = 10;
export const JWTTokenLife = '5d'
export const tokenArgs = ['userid', 'iat', 'exp', 'isAnon', 'expertGroups']