/*
* Modified code taken from:
https://github.com/expo/expo

The MIT License (MIT)

Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWIS E, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import chatScreen from '../screens/Chat-NoInput-Screen'
import TabBarIcon from '../components/TabBarIcon';
// TODO: This is some placeholder screens until we get the actual screens implemented.
import * as PlaceholderScreens from '../screens/Placeholders-Screen'
import { createSwitchNavigator } from 'react-navigation';
import RecentQs from '../screens/Recent-Questions-Screen'

//Create all the navigation items

const FeedScreenStack = createStackNavigator(
  {
    // * Change the stuff after the FeedScreen: to have it point to an imported screen
    FeedScreen: PlaceholderScreens.FeedScreen,
  },
);



const QuestionTypeScreenStack = createStackNavigator(
  {
    QuestionType: RecentQs,
  },

);




// This is how we can set the appearance of the navigation tabs, labels, icon etc.
// TODO: Re-write this to support more types of icons plus type checking



FeedScreenStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios'
        ? `ios-quote`
        : 'md-quote'
    } />
  ),
}
//Putting the welcome screen here until we fix up navigation!


QuestionTypeScreenStack.navigationOptions = {
  tabBarLabel: "Ask",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios'
        ? `ios-chatbubbles`
        : 'md-chatbubbles'
    } />
  ),
  header: null
}

// * This is where we put things we want to actually appear in the bottom tab navigator.
const tabNavigator = createBottomTabNavigator({
  QuestionTypeScreenStack,
  FeedScreenStack,
},
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'nothing'
      },
      header: null,
    },


  });
const bottomStack = createStackNavigator({

  tabNav:tabNavigator,
  ChatScreen:chatScreen,
},
{
  initialRouteName: 'tabNav',
  navigationOptions: {
      headerShown: false
  }
})


export default createSwitchNavigator({
    //This is used to remove the ability to the user to go back once they have hit the
    //the main screen.
    tabNavigator,
    bottomStack,
    
}, {
    backBehavior: 'none',
    navigationOptions: {
        headerShown: false
    },

})


