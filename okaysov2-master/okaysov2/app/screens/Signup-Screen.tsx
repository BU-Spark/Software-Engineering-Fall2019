import * as React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    KeyboardAvoidingView,
    Text,
} from 'react-native';
import Colors from '../themes/defaults/colors';
import { NavigationInjectedProps } from 'react-navigation';
import GenericButton from '../components/GenericButton';
import { State } from '../auth/State'


type Props = NavigationInjectedProps & {
    navigation: NavigationInjectedProps
}

export default class Signup extends React.Component<Props, State>{
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Create an Account
                    </Text>
                    <TextInput style={styles.input}
                        placeholder='Full Name'
                    />
                    <TextInput style={styles.input}
                        placeholder='Username'
                    />
                    <TextInput style={styles.input} secureTextEntry={true}
                        placeholder='Password'
                    />
                    <TextInput style={styles.input}  secureTextEntry={true}
                        placeholder='Verify Password'
                    />
                    <TextInput style={styles.input}
                        placeholder='Email'
                    />
                    <TextInput style={styles.input} keyboardType={"numbers-and-punctuation"}
                        placeholder='Phone Number'
                    />
                    {/* <View style={styles.input}>

                    <NumberPicker />
                    onValueChange={(value) => {this.setState({pickerValue: value})}}
                    </View> */}
                    <View style={styles.button}>
                        <GenericButton buttonAction={() => this.props.navigation.navigate('App')} buttonText={'Signup'} />
                    </View>
                </View>
            </KeyboardAvoidingView>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.transparentColor
    },
    text: {
        color: '#ff857f',
        fontSize: 25,
    },
    input: {
        borderColor: '#ff857f',
        width: 300,
        fontSize: 25,
        borderWidth: 1,
        color: 'black',
        backgroundColor: '#F0F0F0',
        marginVertical: 15,
        borderRadius: 5,
        paddingHorizontal: 16

    },
    button: {
        width: 275,
        color: Colors.invertedTextColor,
        borderRadius: 300,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
                                                                                                                    
//source:https://facebook.github.io/react-native/docs/0.52/textinput
//Adjusted textinput to fit our project (added different texts)
//CC BY-SA 4.0


//source:https://facebook.github.io/react-native/docs/keyboardavoidingview
//Added elements in between
//CC BY-SA 4.0

//source: https://stackoverflow.com/questions/50168669/how-to-change-the-border-color-of-a-text-input-in-a-react-native-app?rq=1
//author: https://stackoverflow.com/users/8627166/sumit-kumar-pradhan
//edit: https://stackoverflow.com/users/4826457/suraj-rao
//changed where to put the style and added different input texts
//CC BY-SA 4.0
