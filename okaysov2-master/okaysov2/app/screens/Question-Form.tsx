import * as React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
} from 'react-native';
import Colors from '../themes/defaults/colors';

import GenericButton from '../components/GenericButton';
export default class QuestionForm extends React.Component{
    render(){
           
            
    return(
        <View style={styles.container}>     
            <TextInput style={styles.textbox}
            placeholder="Type your question here"/>
            <View style={styles.button}>
                    <GenericButton buttonAction={()=>Alert.alert("Your question has been submited. It may take a while for our experts to respond.")} buttonText="Submit" />
            </View> 
        </View>
    )
}
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparentColor
    },
    textbox:{
        // flex:1,
        // justifyContent:'flex-end',
        marginTop:20,
        marginBottom:5,
        fontSize: 25
    },
    button:{
        // flex:1,
        marginTop:20,
        justifyContent:'flex-end',
        // marginBottom:36,
        color: '#ff857f',
        fontSize: 25
    }
})