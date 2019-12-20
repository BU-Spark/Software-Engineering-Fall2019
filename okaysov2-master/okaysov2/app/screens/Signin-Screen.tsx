import * as React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Text
} from 'react-native';
import * as Content from '../content/welcometxt.json';
import Colors from '../themes/defaults/colors';
import { NavigationInjectedProps } from 'react-navigation';
import GenericButton from '../components/GenericButton';
import { State } from '../auth/State'


type Props = NavigationInjectedProps & {
    navigation: NavigationInjectedProps
}

export default class Signin extends React.Component<Props, State>{
    render() {
        return (

            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container}>
                    <Image source={require('../../assets/images/logo.png')}
                        style={{ width: 160, height: 160 }} />
                    <Text style={styles.text}>{Content.space}</Text>
                    <TextInput style={styles.input}
                        placeholder='Username'
                    />
                    <TextInput style={styles.input} secureTextEntry={true}
                        placeholder='Password'
                    />
                    <View style={styles.button}>
                        <GenericButton buttonAction={() => this.props.navigation.navigate('App')} buttonText={'Login'} />
                    </View>


                    <View style={styles.button}>
                        <GenericButton buttonAction={() => this.props.navigation.navigate('SignUp')} buttonText={'Signup'} />
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
        fontSize: 30
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
        width: 310,
        color: Colors.invertedTextColor,
        borderRadius: 100,
        padding: 7
    },
    specialbutton: {
        width: 310,
        color: '#ff857f',
        borderRadius: 100,
        padding: 7
    }
});
