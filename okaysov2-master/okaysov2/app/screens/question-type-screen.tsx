import * as React from 'react';
import { StyleSheet, View, Text, Alert, ImageBackground } from 'react-native';
import Colors from '../themes/defaults/colors'
import * as Content from '../content/en-us.json'
import Anonpubbutton from '../components/anon-pub_button'
import AccountPrivButton from '../components/Account-Private_Button'
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationInjectedProps } from 'react-navigation';
import { State } from '../auth/State'


type Props = NavigationInjectedProps & {};

export default class QuestionTypeScreen extends React.Component<Props, State> {

    defaultButton = () => Alert.alert('Button with adjusted color pressed');
    render() {
        return (
            <SafeAreaView>
                <ImageBackground source={require(`../../assets/images/background_color_full.png`)} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.container}>
                        <Text style={styles.contentText}></Text>
                        <Text style={styles.contentText}></Text>
                        <Text style={styles.contentText}></Text>
                        <Text style={styles.contentText}></Text>
                        <Text style={styles.titleText}>{Content.ask_question_intro_text}</Text>
                        <Anonpubbutton buttonAction={() => this.props.navigation.navigate('Terms')}
                            buttonText={Content.account_button_anon_text}
                            buttonColor={Colors.buttonColor} />
                        <Text style={styles.contentText}>{Content.account_create_anon_text}</Text>
                        <Text style={styles.titleText}>{Content.ask_question_or_text}</Text>
                        <AccountPrivButton buttonAction={() => this.props.navigation.navigate('Auth')} buttonColor={Colors.buttonColor} buttonText={Content.account_button_private_text} />
                        <Text style={styles.contentText}>{Content.account_create_private_text}</Text>
                    </View>
                </ImageBackground>
            </ SafeAreaView>

        );
    }
}





const styles = StyleSheet.create({
    flexContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: "center",
        marginLeft: 16,
        backgroundColor: Colors.transparentColor
    },
    titleText: {
        color: Colors.invertedTextColor,
        textAlign: "center",
        fontSize: 45,
        fontFamily: "Cabin-Bold"
    },
    contentText: {
        marginLeft: 16,
        marginRight: 16,
        color: Colors.invertedTextColor,
        textAlign: "center",
        fontFamily: "Cabin-Regular",
        fontSize: 20,
    }
});
