import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Colors from '../themes/defaults/colors';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import MyQuestion from '../components/myQuestions'
import * as API from '../../api/api-wrapper';
import { State } from '../auth/State'
import SignOutButton from '../components/SignOutButton';

type Props = NavigationInjectedProps & {
    navigation: NavigationInjectedProps
}

function _numQuestions() {
    var length2
    length2 = (API.getUserQuestions('123456')).length;
    var index_arr: number[] = []
    for (let index = 0; index < length2; index++) {
        index_arr[index] = index;

    }

    return index_arr

}

class InboxScreen extends React.Component<Props, State>{

    render() {
        var index: number[] = _numQuestions();
        return (

            <View style={styles.container}>
                <Text style={styles.text}>My Inbox</Text>
                <SignOutButton buttonAction={() => this.props.navigation.navigate('Welcome')} />
                <View style={styles.attachcontainer}>

                    <ScrollView>
                        {index.map((value, index) => {
                            return <MyQuestion key={Math.random()} navDest={() => this.props.navigation.navigate('ChatScreen', {
                                QuID: index
                            })}
                                question={API.getQuestionWithResponsesByID(index.toString())}></MyQuestion>
                        })}

                    </ScrollView>

                </View>
            </View>

        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.bodyColor
    },
    text: {
        color: '#72bcd4',
        fontSize: 40,// Normalize(30)
        fontFamily: 'Cabin-Bold'
    },
    text2: {
        borderColor: '#C0C0C0',
        fontSize: 15,//Normalize(25),
    },
    text3: {
        marginRight: 'auto',
        borderColor: '#000000',
        fontSize: 15,//Normalize(25),
    },
    button: {
        width: 275,
        color: Colors.invertedTextColor,
        borderRadius: 300,
        padding: 16
    },
    attachcontainer: {
        padding: 10,
        flex: .99,
        width: '100%',
        backgroundColor: '#00bbdc'
    }
});

export default withNavigation(InboxScreen);
