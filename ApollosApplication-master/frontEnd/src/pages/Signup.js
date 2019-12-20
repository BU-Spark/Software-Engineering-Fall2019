//citation https://facebook.github.io/react-native/docs/
//         https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    Keyboard,
    Image,
    ImageBackground,
    Alert,
    ScrollView
} from 'react-native';


import {Actions} from 'react-native-router-flux';

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            firstname: '',
            middleinit: '',
            lastname: '',
            dob: '',
            sex: '',
            height: '',
            weight: '',
            allergy: ''
        }
    }

    goBack() {
        Actions.pop()
    }

    showHipaa =async()=>{
        Alert.alert(
            'HIPAA Sign Form',
            'Content to be continued.....',
            [

                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'I Agree', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );

    }





    storeData =async()=>{
        const {username,password,firstname,middleinit,lastname,dob,sex,height,weight,allergy} = this.state;
        if (username == '' || password == '')
        {
            alert('Email and Password are empty! Please re-enter!');
            return;
        }

        //make sure that all user inputs are converted into strings before reaching the backend
        var usernameS = String(username);
        var passwordS = String(password);
        var firstnameS = String(firstname);
        var middleinitS = String(middleinit);
        var lastnameS = String(lastname);
        var dobS = String(dob);
        var sexS = String(sex);
        var heightS = String(height);
        var weightS = String(weight);
        var allergyS = String(allergy);

        // save user details into a dictionary
        let signupDetails = {
            username: usernameS,
            password: passwordS,
            firstname: firstnameS,
            middleinit: middleinitS,
            lastname: lastnameS,
            dob: dobS,
            sex: sexS,
            height: heightS,
            weight: weightS,
            allergy: allergyS,
        }
        console.log(signupDetails)
        var resCode;
        const formData = new FormData();
        formData.append('USERNAME',usernameS );
        formData.append('PASSWORD',passwordS );
        formData.append('FIRST_NAME',firstnameS );
        formData.append('MIDDLE_INITIAL',middleinitS );
        formData.append('LAST_NAME',lastnameS );
        formData.append('DOB',dobS );
        formData.append('SEX',sexS );
        formData.append('HEIGHT',heightS );
        formData.append('WEIGHT',weightS );
        formData.append('ALLERGIES',allergyS );


        // method to send user information to backend to so that it can be put in database
        fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: {
                // Accept: 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
            body:formData,

            //     JSON.stringify({
            //     'USERNAME': usernameS,
            //     'PASSWORD': passwordS,
            //     'FIRST_NAME': firstnameS,
            //      'MIDDLE_INITIAL': middleinitS,
            //     'LAST_NAME': lastnameS,
            //     'DOB': dobS,
            //     'SEX': sexS,
            //     'HEIGHT': heightS,
            //     'WEIGHT': weightS,
            //     'ALLERGIES': allergyS
            // }),
        }).then((response) => response.text())
            .then((responseJson) => {
                var jsonobj = eval("("+responseJson+")")
                resCode = jsonobj.responseCode
                //resCode =  responseJson["responseCode"];
                console.log(resCode);
                if(resCode == 201)
                {
                    // user was successfully registered in database. Send user a success message
                    AsyncStorage.setItem('signupDetails', JSON.stringify(signupDetails)); // change with sending to database
                    alert("Welcome to Apollos " + username + "!");
                }
                else
                {
                    // user was not successfully added to the database and therefore is not registered. Send user an error message

                    alert("You were not able to be successfully registered. Please try again.  " + resCode);
                }
                Keyboard.dismiss();
            })
            .catch((error) => {

                console.log(error);
                return error;
            });
    }


    /*
        storeData =async()=>{
            const {username,password,firstname,middleinit,lastname,dob,sex,height,weight,allergy} = this.state;
            if (username == '' || password == '')
            {

                alert('Email and Password are empty! Please re-enter!');

            }

            let signupDetails={
                username: username,
                password: password,
                firstname: firstname,
                middleinit: middleinit,
                lastname: lastname,
                dob: dob,
                sex: sex,
                height: height,
                weight: weight,
                allergy: allergy
            }


            AsyncStorage.setItem('signupDetails', JSON.stringify(signupDetails));

            Keyboard.dismiss();
            alert("You successfully registered. username: " + username );
        }
    */
    render() {
        return(

            <ScrollView style={styles.container}>
                <Image
                    source={require("../images/register/title.png")}
                    resizeMode="contain"
                    style={styles.image}
                ></Image>
                <View style={styles.image12Row}>
                    <Image
                        source={require("../images/register/line.png")}
                        resizeMode="contain"
                        style={styles.image12}
                    ></Image>

                </View>
                <TextInput style={styles.username}
                           onChangeText={(username) => this.setState({username})}
                           autoCapitalize={'none'}
                           ref={(input) => this.username = input}
                >Username</TextInput>
                <TextInput style={styles.password}
                           onChangeText={(password) => this.setState({password})}
                           autoCapitalize={'none'}
                           ref={(input) => this.password = input}
                >Password</TextInput>
                <TextInput style={styles.firstname}
                           onChangeText={(firstname) => this.setState({firstname})}
                           autoCapitalize={'none'}
                           ref={(input) => this.firstname = input}
                >Firstname</TextInput>
                <TextInput style={styles.middleInitial}
                           onChangeText={(middleinit) => this.setState({middleinit})}
                           autoCapitalize={'none'}
                           ref={(input) => this.middleinit = input}
                >Middle Initial</TextInput>
                <TextInput style={styles.lastname}
                           onChangeText={(lastname) => this.setState({lastname})}
                           autoCapitalize={'none'}
                           ref={(input) => this.lastname = input}
                >Lastname</TextInput>
                <TextInput style={styles.dateOfBirth}
                           onChangeText={(dob) => this.setState({dob})}
                           autoCapitalize={'none'}
                           ref={(input) => this.dob = input}
                >Date of Birth</TextInput>
                <TextInput style={styles.sex}
                           onChangeText={(sex) => this.setState({sex})}
                           autoCapitalize={'none'}
                           ref={(input) => this.sex = input}
                >Sex</TextInput>
                <TextInput style={styles.height}
                           onChangeText={(height) => this.setState({height})}
                           autoCapitalize={'none'}
                           ref={(input) => this.height = input}
                >Height</TextInput>
                <TextInput style={styles.weight}
                           onChangeText={(weight) => this.setState({weight})}
                           autoCapitalize={'none'}
                           ref={(input) => this.weight = input}
                >Weight</TextInput>
                <TextInput style={styles.allergy}
                           onChangeText={(allergy) => this.setState({allergy})}
                           autoCapitalize={'none'}
                           ref={(input) => this.allergy = input}>
                    Allergy(ex. dairy, nuts)
                </TextInput>


                <View style={styles.signupTextCont}>
                    <TouchableOpacity onPress={this.storeData}><Text
                        style={styles.signupButton}>Sign Up!</Text></TouchableOpacity>
                </View>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
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

    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: '#12799f',
        fontSize:16
    },
    signupButton: {
        color: '#12799f',
        fontSize:16,
        fontWeight: '500'
    },
    image: {
        width: 135,
        height: 115,
        marginTop: 33,
        alignSelf: "center"
    },
    image12: {
        width: 285,
        height: 255
    },
    allergy: {
        width: 281,
        height: 30,
        color: "#121212",
        marginTop: 10,
        marginLeft: 47
    },
    image6: {
        width: 100,
        height: 76,
        marginTop: 35,
        marginLeft: 96
    },
    username10Column: {
        width: 281,
        marginLeft: 119,
        marginTop: 13,
        marginBottom: 89
    },
    image12Row: {
        height: 255,
        flexDirection: "row",
        marginTop: 455,
        marginLeft: -362,
        marginRight: 52
    },
    username: {
        width: 281,
        height: 15,
        color: "#121212",
        marginTop: -696,
        marginLeft: 47
    },
    password: {
        width: 281,
        height: 15,
        color: "#121212",
        marginTop: 29,
        marginLeft: 47
    },
    firstname: {
        width: 281,
        height: 15,
        color: "#121212",
        marginTop: 26,
        marginLeft: 47
    },
    middleInitial: {
        width: 281,
        height: 10,
        color: "#121212",
        marginTop: 21,
        marginLeft: 47
    },
    lastname: {
        width: 281,
        height: 10,
        color: "#121212",
        marginTop: 37,
        marginLeft: 47
    },
    dateOfBirth: {
        width: 281,
        height: 15,
        color: "#121212",
        marginTop: 35,
        marginLeft: 47
    },
    sex: {
        width: 281,
        height: 15,
        color: "#121212",
        marginTop: 23,
        marginLeft: 47
    },
    height: {
        width: 281,
        height: 23,
        color: "#121212",
        marginTop: 20,
        marginLeft: 47
    },
    weight: {
        width: 281,
        height: 15,
        color: "#121212",
        marginTop: 26,
        marginLeft: 47
    }
});
