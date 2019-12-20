import MainTabNavigator from './MainTabNavigator'
import { createSwitchNavigator } from 'react-navigation';
const HomeScreenNavigator = createSwitchNavigator({
    //This is used to remove the ability to the user to go back once they have hit the
    //the main screen.
    MainTabNavigator,

}, {
    backBehavior: 'none',
    navigationOptions: {
        headerShown: false
    },

})

export default HomeScreenNavigator;
