//citation: https://github.com/wix/react-native-calendars

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { StyleSheet, } from 'react-native';

import {Actions} from 'react-native-router-flux';


export default class CalendarUser extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    goBack() {
        Actions.pop()
    }
    render() {
        return(
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                //...calendarParams
            />

        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500',
    }

});

