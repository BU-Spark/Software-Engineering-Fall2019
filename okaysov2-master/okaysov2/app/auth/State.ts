//The authentication states our app can support
export const AUTH_STATES = {
    //Just browsing, not abilities within the app
    BROWSING: 'BROWSING',
    //Traditional account
    AUTHENTICATED: 'AUTHENTICATED',
    //Asking questions without directly creating an account
    ANONYMOUS: 'ANONYMOUS'
} as const

//The type to hold these states
export type AuthState = keyof typeof AUTH_STATES
//The actual state object that is passed along to navigation/screens.
export type State = {
    authState: AuthState

}

