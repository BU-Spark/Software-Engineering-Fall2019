
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from '../screens/Welcome-Screen'
import SeeOtherConversations from '../screens/Warning-See-Other-Conversations-Screen'
import BrowseNav from '../navigation/BrowseTabNavigator'
const SeeConvoNavigator = createStackNavigator ({
    WelcomeScreen: WelcomeScreen,
    SeeOtherConversations: SeeOtherConversations, 
    BrowseNavigation:BrowseNav,
    
    },
    {      
    navigationOptions: {
        headerShown: false
    },
    
    initialRouteName: 'WelcomScreen'
})

export default SeeConvoNavigator



