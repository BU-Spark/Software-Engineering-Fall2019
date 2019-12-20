//citation https://facebook.github.io/react-native/docs/
//         https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md
//         https://www.npmjs.com/package/react-native-table-component
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
    ScrollView, Alert,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Table, TableWrapper, Row, Rows, Col} from 'react-native-table-component';


export default class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {

            tableTitle: ['username', 'firstname', 'middleinit', 'lastname', 'dob', 'sex', 'height', 'weight', 'allergy'],
            tableData: [
                [ ''],
                [ ''],
                [ ''],
                [ ''],
                [ ''],
                [ ''],
                [ ''],
                [ ''],
                [ ''],

            ]
        }
        this.profileInfo()
    }
    _alertIndex(data) {
        Alert.alert(`You are contacting ${data}`);
    }

    goBack() {
        Actions.pop()
    }
    profileInfo =async()=>{
        try{
            const state = this.state;
        /*
            let userToken = await AsyncStorage.getItem('userToken')
            let ls = JSON.parse(userToken);
            var token = ls.token;
            var usernameS = String(username);
            var tokenS = String(token);
            const formData = new FormData();
            formData.append('USERNAME',usernameS );
            formData.append('TOKEN',tokenS );

            var resCode;
            fetch('https://127.0.0.1:5000/profile', {
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
                    var signupDetails = jsonobj.body;
                    console.log(resCode);
                    if(resCode == 201)
                    {
                        // user was successfully found in database with matching password. Send user a success message
                        AsyncStorage.setItem('signupDetails', JSON.stringify(signupDetails));
                        alert("Welcome Back " + username + "!");
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
            */


            let signupDetails = await AsyncStorage.getItem('signupDetails');
            let ld = JSON.parse(signupDetails);
            this.setState({tableData: [[ld.username],
                    [ld.firstname],[ld.middleinit],[ld.lastname],[ld.dob],[ld.sex],[ld.height],[ld.weight],[ld.allergy]]});


        }catch(error)
        {
            alert(error);
        }


    }
    render() {
        //this.profileInfo()
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(data)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Modify</Text>
                </View>
            </TouchableOpacity>
        );
        return(
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 1}}>

                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
                        <Rows data={state.tableData} flexArr={[2]} style={styles.row} textStyle={styles.text}/>
                    </TableWrapper>
                </Table>
            </View>

        )
    }


}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
});



