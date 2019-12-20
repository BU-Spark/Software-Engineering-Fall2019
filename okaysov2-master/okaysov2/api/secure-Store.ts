//Not implemented but the wireframe of how we could candle storing user tokens and anonymous usernames and passwords. 
import * as SecureStore from 'expo-secure-store';
export var currentToken: string | undefined
export var key: string | undefined
export const setKey= async(key1)=>{
    if(key1==''){
        key = undefined
    }
    else{key=key1}          
}
export const setToken = async (key,token) => {
    await SecureStore.setItemAsync(key, token);
};

export const deleteToken = async (key,token) => {
    await SecureStore.deleteItemAsync(key, token);
};
export const retrieveToken = async (key) => {
    let temp = await SecureStore.getItemAsync(key);
    if(temp){
        currentToken = temp
    }else{
        //Nothing
        currentToken = undefined
    }
};

//Source:https://stackoverflow.com/questions/50404239/how-to-store-tokens-in-react-native/50405159
//Author: https://stackoverflow.com/users/9718950/artem-bochkarev
//Changes: Removed set and get token calls
//CC BY-SA 4.0