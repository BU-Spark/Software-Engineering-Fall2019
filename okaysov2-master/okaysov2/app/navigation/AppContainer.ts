import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Colors from '../themes/default/colors'
import WelcomeNavigator from './WelcomeNavigator'
import AuthNavigator from './AuthNavigator'
import HomeScreenNavigator from './HomerScreenNavigator'
import BrowseNavigator from './BrowseTabNavigator'


const AppNavigator = createSwitchNavigator({
    Welcome: WelcomeNavigator,
    Auth: AuthNavigator,
    App: HomeScreenNavigator,
    Browse: BrowseNavigator
}, {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.backgroundColor,

        },
        headerTintColor: Colors.headerColor,
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    },
    navigationOptions: {
        headerMode: 'none'
    },
    backBehavior: 'none'
});

export default createAppContainer(AppNavigator);
