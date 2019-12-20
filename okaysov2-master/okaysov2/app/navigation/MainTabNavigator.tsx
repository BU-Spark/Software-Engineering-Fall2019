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
import TabBarIcon from '../components/TabBarIcon';
// TODO: This is some placeholder screens until we get the actual screens implemented.
import * as PlaceholderScreens from '../screens/Placeholders-Screen'
import { createSwitchNavigator } from 'react-navigation';
import ChatNavigatorFlow from '../navigation/ChatNavigator'
import AskNavigationFlow from '../navigation/AskNavigator'



//Create all the navigation items

const FeedScreenStack = createStackNavigator(
  {
    // * Change the stuff after the FeedScreen: to have it point to an imported screen
    FeedScreen: PlaceholderScreens.FeedScreen,
  },
);

const InboxScreenStack = createStackNavigator(
  {
    InboxScreen: ChatNavigatorFlow,
  },
);

const QuestionTypeScreenStack = createStackNavigator(
  {
    QuestionType: AskNavigationFlow,
  },

);

const ExpertsScreenStack = createStackNavigator(
  {
    ExpertsScreen: PlaceholderScreens.ExpertsScreen,
  },
);


// This is how we can set the appearance of the navigation tabs, labels, icon etc.
// TODO: Re-write this to support more types of icons plus type checking
ExpertsScreenStack.navigationOptions = {
  tabBarLabel: 'Experts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios'
        ? `ios-people`
        : 'md-people'
    } />
  ),
}


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
InboxScreenStack.navigationOptions = {
  tabBarLabel: "Inbox",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios'
        ? `ios-mail`
        : 'md-mail'
    } />
  ),
}

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
  FeedScreenStack,
  InboxScreenStack,
  QuestionTypeScreenStack,
  ExpertsScreenStack
},
  //This is not currently working right now, trying to figure out how to style these!
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      header: null,
    },
  });



export default createSwitchNavigator({ tabNavigator });
