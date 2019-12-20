import { createStackNavigator } from "react-navigation-stack";
import WelcomeScreen from '../screens/Welcome-Screen'
import QuestionTypeScreen from '../screens/question-type-screen'
import TermsScreen from '../screens/Terms-Conditions-Screen'
import SeeOtherConversations from '../screens/Warning-See-Other-Conversations-Screen'

const WelcomeStack = createStackNavigator({
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    SeeOtherConversations,
    Terms: TermsScreen,
    QuestionTypeScreen,
}, {
    //Navigation Options
    initialRouteName: 'WelcomeScreen',
},

);

export default WelcomeStack;
