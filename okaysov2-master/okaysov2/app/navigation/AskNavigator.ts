
import { createStackNavigator } from 'react-navigation-stack';
import askScreen from '../screens/Ask-Screen'
import categoriesScreen from '../screens/Topics-screen'
import chatScreen from '../screens/Chat-NoInput-Screen'
import questionScreen from '../screens/Question-Form'

const AskNavigator = createStackNavigator ({
    AskScreen: askScreen,
    QuestionCategory: categoriesScreen,
    ChatScreen: chatScreen,
    QuestionForm: questionScreen

}, {
    initialRouteName: 'AskScreen',
    navigationOptions: {
        headerShown: false
    },

})

export default AskNavigator
