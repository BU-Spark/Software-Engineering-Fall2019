import { createStackNavigator } from 'react-navigation-stack';
import InboxScreen from '../screens/Inbox-Screen'
import ChatScreen from '../screens/Chat-Screen'


const ChatNavigator = createStackNavigator ({
    InboxScreen: InboxScreen,
    ChatScreen: ChatScreen

}, {
    initialRouteName: 'InboxScreen',
    navigationOptions: {
        headerShown: false
    },

})

export default ChatNavigator
