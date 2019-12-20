import { createStackNavigator } from 'react-navigation-stack';
import SignupScreen from '../screens/Signup-Screen'
import Signin from '../screens/Signin-Screen'

const AuthStack = createStackNavigator({
    //This is essentially a place holder until we have actual authentication setup
    SignUp: SignupScreen,
    SignIn: Signin,
}, {
    //Navigation Options
    initialRouteName: 'SignIn',
});
export default AuthStack;
