//citation https://facebook.github.io/react-native/docs/
//citation https://reactnavigation.org/docs/en/tab-based-navigation.html
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Keyboard, Image, ImageBackground } from 'react-native';

import {Actions} from 'react-native-router-flux';

import TabNavigator from 'react-native-tab-navigator';


export default class Tofiles extends Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedTab: 'home'};


}
    tofiles() {
        Actions.tofiles()
    }
    goBack() {
        Actions.pop()
    }
    toprofile(){
        Actions.profile()

    }
    calender() {
        Actions.calender()
    }
    contacts(){
        Actions.contacts()
    }
    tolabfiles(){
        Actions.filedetail()
    }
    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Profile"
                        renderIcon={() => <Image style={styles.image} source={require('../images/files/profile.png')} />}
                        renderSelectedIcon={() => <Image style={styles.image} source={require('../images/files/profile.png')} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <View style={styles.container}>
                            <Image
                                source={require("../images/files/profileImage.png")}
                                resizeMode="contain"
                                style={styles.titleImage}
                            />
                            <Text style={styles.hello}>Hello!</Text>
                            <TouchableOpacity onPress={this.toprofile}>
                                <Text style={styles.profile}>View Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.goBack}>
                                <Text style={styles.logout}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'file'}
                        title="Files"
                        renderIcon={() => <Image style={styles.image} source={require('../images/files/files.png')} />}
                        renderSelectedIcon={() => <Image style={styles.image} source={require('../images/files/files.png')} />}
                        onPress={this.tolabfiles}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'calendar'}
                        title="Calendar"
                        renderIcon={() => <Image style={styles.image} source={require('../images/files/calendar.png')} />}
                        renderSelectedIcon={() => <Image style={styles.image} source={require('../images/files/calendar.png')} />}
                        onPress={this.calender}>
                        <View style={styles.page3}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'contact'}
                        title="Contact"
                        renderIcon={() => <Image style={styles.image} source={require('../images/files/messages.png')} />}
                        renderSelectedIcon={() => <Image style={styles.image} source={require('../images/files/messages.png')} />}
                        onPress={this.contacts}>
                        <View style={styles.page3}></View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>


        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    hello: {
        top: 240,
        left: 178,
        color: "#2C66BA",
        position: "absolute",
        width: 80,
        height: 30,
        fontSize: 30

    },
    profile: {
        top: 250,
        left: 165,
        color: "#12799f",
        position: "absolute",
        width: 200,
        height: 30,
        fontSize: 20
    },
    logout:{
        top: 600,
        left: 185,
        color: "#12799f",
        position: "absolute",
        width: 200,
        height: 30,
        fontSize: 18
    },
    image: {
        height: 25,
        width: 25
    },
    titleImage: {
        top: 100,
        width: 111,
        height: 90,
        left: 155
    }
});
