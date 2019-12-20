//citation https://facebook.github.io/react-native/docs/
//         https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
    Image,
    ImageBackground,
    ScrollView,
} from 'react-native';

import {Actions} from 'react-native-router-flux';



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username:'',
        }
    }

    signup() {
        Actions.signup()
    }

    tofiles() {
        Actions.tofiles()
    }


    checkLoginHttp = async() => {
        const {username,password} = this.state;

        // check if username or password is null
        if(username == null || password == null || username == '' || password == '')
        {
            alert("Username or password is invalid. Please try again.");
            return;
        }
        if(password.length < 8)
        {
            alert("Password must be at least 8 characters long.");
            return;
        }
        if(username.length < 6)
        {
            alert("Username must be at least 6 characters long.");
            return;
        }
        if(username.length > 15)
        {
            alert("Username must be less than 16 characters long.");
            return;
        }

        var usernameS = String(username);
        var passwordS = String(password);
        const formData = new FormData();
        formData.append('USERNAME',usernameS );
        formData.append('PASSWORD',passwordS );


        // send username and password to backend to check existence in database using HTTP
        // REAL ENDPOINT: https://18.217.163.109:5000/login
        console.log("Verifying...")
        var resCode;
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => response.text())
            .then((responseJson) => {
                // response code given by HTTP response
                var jsonobj = eval("("+responseJson+")")
                resCode = jsonobj.responseCode;
                //get token
                var token = jsonobj.token;
                console.log(resCode);
                console.log(token);
                if(resCode == 200)
                {
                    let userToken = {
                        username: usernameS,
                        password: passwordS,
                        usertoken: token

                    }
                    // user was successfully found in database with matching password. Send user a success message
                    AsyncStorage.setItem('userToken', JSON.stringify(userToken));
                    alert("Welcome Back " + username + "!");
                    this.tofiles();
                }
                else
                {
                    // user was not successfully found in database. Send user an error message
                    alert("Username or password is invalid. Please try again.");

                }
                Keyboard.dismiss();

            })
            .catch((error) => {
                return error;
            });



    }


    checkLogin =async()=>{
        const {username,password} = this.state;

        //save data with asyncstorage
        let loginDetails={
            username: username,
            password: password,
        }


        try{
            let signupDetails = await AsyncStorage.getItem('signupDetails');
            let ld = JSON.parse(signupDetails);

            if (ld.username != null && ld.password != null)
            {
                if (ld.username == username && ld.password == password)
                {
                    alert('Go in!');
                    this.tofiles();
                }
                else
                {
                    alert('Email and Password does not exist!');
                }
            }

        }catch(error)
        {
            alert(error);
        }

    }


    render() {
        return (

            <ScrollView style={styles.container}>


                <View style={styles.image2Stack}>
                    <Image
                        source={require("../images/login/title.png")}
                        resizeMode="contain"
                        style={styles.titleImage}
                    />

                    <Image
                        source={require('../images/login/line.png')}
                        resizeMode="contain"
                        style={styles.topLine}
                    />

                    <View style={styles.usernameInputBox}>
                        <TextInput style={styles.usernameText}
                                   onChangeText={(username) => this.setState({username})}
                                   autoCapitalize={'none'}
                                   onSubmitEditing={()=> this.password.focus()}
                        >Username</TextInput>
                        <Image
                            source={require("../images/login/confirm.png")}
                            resizeMode="contain"
                            style={styles.confirmIcon}
                        />
                    </View>

                    <ImageBackground
                        source={require('../images/login/line.png')}
                        resizeMode="contain"
                        style={styles.middleLine}
                        imageStyle={styles.middleLineStyle}
                    >
                    </ImageBackground>
                    <ImageBackground
                        source={require('../images/login/line.png')}
                        resizeMode="contain"
                        style={styles.bottomLine}
                        imageStyle={styles.bottomLineStyle}
                    >

                        <View style={styles.passwordInputBox}>
                            <TextInput style={styles.passwordText}
                                       onChangeText={(password) =>this.setState({password})}
                                       secureTextEntry={true}
                                       autoCapitalize={'none'}
                                       ref={(input) => this.password = input}
                            >Password</TextInput>
                            <Image
                                source={require("../images/login/lock.png")}
                                resizeMode="contain"
                                style={styles.lockIcon}
                            />
                        </View>
                    </ImageBackground>

                    <TouchableOpacity>
                        <Image
                            source={require("../images/login/next.png")}
                            resizeMode="contain"
                            style={styles.nextIcon}
                            onPress={this.checkLogin}
                        />
                    </TouchableOpacity>
                </View>


                <View style={styles.signupTextCont}>
                    <TouchableOpacity onPress={this.checkLoginHttp}><Text
                        style={styles.signupButton}>Go!</Text></TouchableOpacity>
                </View>

                <View style={styles.signupTextCont2}>
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text
                        style={styles.signupButton}>Register now</Text></TouchableOpacity>
                </View>
            </ScrollView>


        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10

    },

    signupTextCont2: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 12,
        flexDirection: 'row',
    },

    signupTextCont:{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 12,
        flexDirection: 'row',

    },
    signupText: {
        color: '#12799f',
        fontSize:16,
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500',
        justifyContent: 'center',

    },
    topLine: {
        width: 276,
        height: 50,
        top:30
    },
    middleLine: {
        width: 276,
        height: 100
    },
    middleLineStyle: {},
    confirmIcon: {
        width: 28,
        height: 23

    },
    imageInput: {
        width: 100,
        height: 10,
        marginTop: 52,
        marginLeft: 9
    },

    bottomLine: {
        width: 276,
        height: 100,
        top:20
    },
    bottomLineStyle: {},
    lockIcon: {
        width: 32,
        height: 28
    },
    titleImage: {
        top: 0,
        width: 111,
        height: 90,
        left: 65
    },
    nextIcon: {
        top: 414,
        width: 100,
        height: 76,
        left: 93
    },
    image2Stack: {
        width: 285,
        height: 490,
        marginTop: 163,
        marginLeft: 64
    },
    usernameText: {
        width: 209,
        height: 42,
        color: "#121212",
    },
    usernameInputBox: {
        flexDirection: "row",
        flex: 1,
        marginRight: 21,
        marginLeft: 9,
        marginTop:40
    },
    passwordInputBox: {
        height: 49,
        flexDirection: "row",
        flex: 1,
        marginRight: 20,
        marginLeft: 13,
    },
    passwordText: {
        width: 209,
        height: 42,
        color: "#121212"
    }




});


