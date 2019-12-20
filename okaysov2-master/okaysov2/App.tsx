import * as React from 'react';

import AppContainer from './app/navigation/AppContainer';
import * as secureStore from './api/secure-Store';
import * as Font from 'expo-font'
import { View, Image } from 'react-native';
import { Provider } from 'mobx-react'
import { stores } from './app/state/Index.State';

//This below loading code was taken from:
//https://github.com/expo/new-project-template/blob/d6a440b01801fbeb323265e39a155d969ab6827f/App.js#L19-L37
//License: MIT
//Author: EXPO


export default class App extends React.Component {


  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
    this._loadTokenAsync();
  }

  //Anything that needs to load before the app is loaded (such as assets) should be placed in this function.
  async _loadAssetsAsync() {
    try {
      await Font.loadAsync({
        'Cabin-Regular': require('./assets/fonts/Cabin-Regular.ttf'),
        'Cabin-Bold': require('./assets/fonts/Cabin-Bold.ttf'),
        'Cabin-Italic': require('./assets/fonts/Cabin-Italic.ttf'),
      })
    } catch (e) {
      console.warn("There was an error loading required app components. Please restart the app");
    } finally {
      this.setState({ appIsReady: true })
    }
  }

  async _loadTokenAsync() {
    if (secureStore.key == undefined) {
      return ''
    }
    else {
      secureStore.retrieveToken(secureStore.key).then(val => {
        if (val == undefined) { return '' } else { return val }
      }).catch(err => {
        console.warn("There was an error loading required app components. Please restart the app" + err);
      });
    }

  }

  render() {
    if (this.state.appIsReady) {
      return (
        <Provider {...stores}>
          <AppContainer />
        </Provider>

      )


    } else {
      return (
        <View>
          <Image source={require('./assets/images/logo.png')}
            style={{ width: 160, height: 160 }} />
        </View>
      );
    }
  }
};
