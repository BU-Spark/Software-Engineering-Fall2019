import signup from './unsecureRoutes/authentication/signup'
import login from './unsecureRoutes/authentication/login'
import secureRoutes from './secureRoutes/indexSecureRoutes'
import {getRecentQuestions} from './unsecureRoutes/recentQuestionRoute'

export const securedRoutes =  [...secureRoutes];
export const unsecuredRoutes = [...signup, ...login, ...getRecentQuestions]
export const allRoutes = [...securedRoutes, ...unsecuredRoutes]
