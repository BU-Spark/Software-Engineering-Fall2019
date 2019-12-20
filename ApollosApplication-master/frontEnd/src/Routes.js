//citation https://facebook.github.io/react-native/docs/
//         https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md
import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Tofiles from './pages/Files';
import CalendarUser from './pages/Calendar';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile'
import  FiledetailO from './pages/Filedetail'
import  Image from  './pages/Image'


export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                    hideNavBar={false}
                    navigationBarStyle={{backgroundColor: '#1565c0',}}
                    titleStyle={{color: 'white',}}
            >
                <Stack key="root">
                    <Scene key="login" component={Login} title="Login"/>
                    <Scene key="signup" component={Signup} title="Sign up"/>
                    <Scene key="tofiles" component={Tofiles} title="Files"/>
                    <Scene key="calender" component={CalendarUser} title="Calendar"/>
                    <Scene key="contacts" component={Contacts} title="Contacts"/>
                    <Scene key="profile" component={Profile} title="My Profile"/>
                    <Scene key="filedetail" component={FiledetailO} title="File Detail"/>
                    <Scene key="image" component={Image} title="Image Detail"/>

                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}
