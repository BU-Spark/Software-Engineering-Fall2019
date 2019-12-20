import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
} from 'react-native';
import GenericButton from '../components/GenericButton';
import { NavigationInjectedProps } from 'react-navigation';
import * as Content from '../content/en-us.json';
import { State } from '../auth/State'
type Props = NavigationInjectedProps & {
    navigation: NavigationInjectedProps
}
export default class Warning extends React.Component<Props, State>{
    render() {
        return (
            <ImageBackground source={require(`../../assets/images/background_color.png`)} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Text style={styles.terms}>See Other Conversations</Text>
                    <Text></Text>
                    <View style={styles.attachcontainer}>
                        <Text style={styles.statement}>{Content.see_other_conversations_mode}</Text>
                    </View>
                    <Text></Text>
                    <GenericButton buttonAction={() => this.props.navigation.navigate('Browse')} buttonText={'Proceed'} />

                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    terms: {
        fontSize: 40,
        textAlign: 'center',
        fontFamily: "Cabin-Bold",
        color: '#FFFFFF'

    },
    statement: {
        fontSize: 25,
        fontFamily: "Cabin-Regular",
        marginBottom: 5,
        textAlign: 'center'

    },
    attachcontainer: {
        padding: 30,
        // flex: 1,
        width: '90%',
        borderWidth: 2,
        borderColor: 'white'
        // backgroundColor: '#E8E8E8'
    }
});