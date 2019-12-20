//citation https://facebook.github.io/react-native/docs/
//          https://www.npmjs.com/package/react-native-table-component
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
    Button,
    PixelRatio,
    Platform
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {Cell, Row, Table, TableWrapper} from 'react-native-table-component';
import ImagePicker from 'react-native-image-picker';

//citation: https://www.npmjs.com/package/react-native-table-component
export default class FiledetailO extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            tableHead: ['Title', 'Time', 'Summary', ''],
            tableData: [
                ['Blood Test.', '09/19', '3 warning sign', 'Blood Test.'],
                ['Xray Scan Review.', '09/19', 'Open MRIs', 'Xray Scan Review.'],
                ['knee Results.', '09/19', 'Open MRIs', 'knee Results.'],
                ['Blood Test.', '09/19', '3 warning sign', 'Blood Test.'],
                ['Xray Scan Review.', '09/19', 'Open MRIs', 'Xray Scan Review.'],
                ['knee Results.', '09/19', 'Open MRIs', 'knee Results.'],
                ['Blood Test.', '09/19', '3 warning sign', 'Blood Test.'],
                ['Xray Scan Review.', '09/19', 'Open MRIs', 'Xray Scan Review.'],
                ['knee Results.', '09/19', 'Open MRIs', 'knee Results.'],
            ],
            avatarSource: null,
            data:[]
        }
    }

    alertView(data) {
        Alert.alert(`You are viewing ${data}`);
    }

    delete(index) {
        //Alert.alert(`You are deleting ${this.state.tableData[index][0]}`);
        this.setState({data: index
        });
        this.deleteFile();
    }

    view(index) {
        this.setState({show: true})
        this.setState({data:index})
        this.showFile();
    }

    goBack() {
        Actions.pop()
    }

    profileInfo = async () => {
        try {
            let signupDetails = await AsyncStorage.getItem('signupDetails');
            let ld = JSON.parse(signupDetails);
            this.state = ld;
            //console.log(this.state);

        } catch (error) {
            alert(error);
        }
    }

    imageDetail() {
        Actions.image()

    }

    showFile = async () =>{
            let userToken = await AsyncStorage.getItem('userToken');
            let ldtoken = JSON.parse(userToken);
            var filename = String(this.state.tableData[this.state.data][0]);
            console.log(ldtoken.usertoken);
            console.log(ldtoken.username);

            const formData = new FormData();
            formData.append('FILENAME',filename);
            console.log(formData);
            var resCode;


            fetch('http://127.0.0.1:5000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'bearer: '+ldtoken.usertoken,
                    'user' : ldtoken.username
                },
                body: formData,
            }).then((response) => response.text())
                .then((responseJson) => {
                    console.log(responseJson)
                    // response code given by HTTP response
                    var jsonobj = eval("("+responseJson+")")
                    resCode = jsonobj.responseCode;
                    //get token
                    var token = jsonobj.token;
                    console.log(resCode);
                    if(resCode == 200)
                    {
                        console.log(resCode)
                        alert("file delete from server!!")
                        //alert("Welcome Back " + username + "!");
                    }
                    else
                    {
                        //alert("Username or password is invalid. Please try again.");
                        console.log(resCode)
                    }
                    Keyboard.dismiss();

                })
                .catch((error) => {
                    return error;
                });

    }

    fileDetail = async () => {

        Alert.alert(
            'Success!',
            'You have successfully upload the file!',
            [
                {text: 'Continue', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );

    }


    deleteFile = async ()=>{

        let userToken = await AsyncStorage.getItem('userToken');
        let ldtoken = JSON.parse(userToken);
        var filename = String(this.state.tableData[this.state.data][0]);
        console.log(ldtoken.usertoken);
        console.log(ldtoken.username);

        const formData = new FormData();
        formData.append('FILENAME',filename);
        console.log(formData);
        var resCode;


        fetch('http://127.0.0.1:5000/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'bearer: '+ldtoken.usertoken,
                'user' : ldtoken.username
            },
            body: formData,
        }).then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson)
                // response code given by HTTP response
                var jsonobj = eval("("+responseJson+")")
                resCode = jsonobj.responseCode;
                //get token
                var token = jsonobj.token;
                console.log(resCode);
                if(resCode == 200)
                {
                    console.log(resCode)
                    alert(`file ${filename} delete from server`)
                    //alert("Welcome Back " + username + "!");
                }
                else
                {
                    //alert("Username or password is invalid. Please try again.");
                    console.log(resCode)
                }
                Keyboard.dismiss();

            })
            .catch((error) => {
                return error;
            });

        var arr = this.state.tableData;
        arr.splice(this.state.data,1);
        this.setState({
                tableData: arr
            }
        );

    }

    checkUpload = async ()=>{
        let userToken = await AsyncStorage.getItem('userToken');
        let ldtoken = JSON.parse(userToken);
        const formData = new FormData();
        //formData.append('USER',String(ldtoken.username));
        //formData.append('USERTOKEN',String(ldtoken.usertoken));
        formData.append('FILE',{
            name:this.state.avatarSource.fileName,
            type:this.state.avatarSource.type,
            uri:this.state.avatarSource.uri});
        //console.log(formData)
        var resCode;
        fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'bearer: '+ldtoken.usertoken,
                'user': ldtoken.username
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
                if(resCode == 200)
                {
                    console.log(resCode)
                    this.fileDetail()
                    //alert("Welcome Back " + username + "!");
                }
                else
                {
                    //alert("Username or password is invalid. Please try again.");
                    console.log(resCode)
                }
                Keyboard.dismiss();

            })
            .catch((error) => {
                return error;
            });

    }

    selectPhotoTapped() {
        const options = {
            title: 'Select Photo',
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take a Photo',
            chooseFromLibraryButtonTitle: 'Select Photo',

            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = response;

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });

                this.checkUpload()

                var date = new Date();
                var year = date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString();
                var filename = response.fileName;
                var arr = this.state.tableData;
                arr.push([filename, year, filename, filename])
                this.setState({
                        tableData: arr
                    }
                );
                let imageS = {
                    image: source.data
                }
                //AsyncStorage.setItem('image', JSON.stringify(imageS)); // change with sending to database
                AsyncStorage.setItem(filename, JSON.stringify(imageS)); // change with sending to database

                //console.log()
                //this.fileDetail();
            }
        });


    }

    render() {
        const state = this.state;
        const element = (data, index) => (
            <View>
                <TouchableOpacity onPress={() => this.view(index)}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>View</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.space}/>
                <TouchableOpacity onPress={() => this.delete(index)}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Delete</Text>
                    </View>

                </TouchableOpacity>
            </View>


        );

        if (state.show === false) {

            return (
                <View style={styles.container}>

                    <Table>
                        <ScrollView style={styles.scrollView}>
                            <Row data={state.tableHead} style={styles.head} textStyle={styles.headText}/>
                            {
                                state.tableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex}
                                                      data={cellIndex === 3 ? element(cellData, index) : cellData}
                                                      textStyle={styles.text}/>
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                        </ScrollView>
                    </Table>
                    <View style={styles.signupTextCont2}>

                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 30}]}>
                                {this.state.avatarSource === null ? <Text>Upload</Text> :
                                    <Text>Upload</Text>
                                }
                            </View>

                        </TouchableOpacity>

                    </View>


                </View>

            )
        } else {

            //console.log(this.state.avatarSource)

            return (

                <View>
                    <Image  style={styles.avatar1} source={this.state.avatarSource}/>
                    <TouchableOpacity onPress={() =>this.setState({show : false})}>
                        <Text style={styles.logout}>Go Back</Text>
                    </TouchableOpacity>
                </View>

            )
        }

    }


}

const styles = StyleSheet.create({
    logout:{
        top: 350,
        left: 185,
        color: "#12799f",
        position: "absolute",
        width: 200,
        height: 30,
        fontSize: 18
    },
    signupTextCont2: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 10,
        flexDirection: 'row',
    },

    signupText: {
        color: '#12799f',
        fontSize:16,
    },
    container: { flex: 1,
        //padding: 10,
        //paddingTop: 30,
        backgroundColor: 'white'
    },
    head: { height: 40, backgroundColor: '#2C66BA' },
    text: { margin: 6 },
    headText: { margin: 6 ,  color: '#ffffff'},
    row: { flexDirection: 'row', backgroundColor: 'white' },
    btn: { width: 58, height: 18, backgroundColor: '#595bbb',  borderRadius: 2 },
    space: {height: 2},
    btnText: { textAlign: 'center', color: '#fff' },
    scrollView: {
        marginHorizontal: 0,
    },
    upload: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 12,
        flexDirection: 'row',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100
    },
    avatar1: {
        width: 400,
        height: 400
    }



});


