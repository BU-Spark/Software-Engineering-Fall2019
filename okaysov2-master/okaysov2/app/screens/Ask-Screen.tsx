import * as React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Colors from '../themes/defaults/colors';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import RecentQuestion from '../components/RecentQuestion'
import AskButton from '../components/AskUs-button'
import * as API from '../../api/api-wrapper';
import { State } from '../auth/State'
import SignOutButton from '../components/SignOutButton';

type Props = NavigationInjectedProps & {};

function _numQuestions() {
    var length2
    length2 = (API.getRecentQuestions()).length;
    var index_arr: number[] = []
    for (let index = 0; index < length2; index++) {
        index_arr[index] = index;

    }

    return index_arr

}

class AskScreen extends React.Component<Props, State>{
    render() {
        var index: number[] = _numQuestions();
        return (


            <View style={styles.container}>


                <Text></Text>
                <SignOutButton buttonAction={() => this.props.navigation.navigate('Welcome')} />

                <Text></Text>
                <Text></Text>
                <Text style={styles.text}>Ask us anything.</Text>
                <Text style={styles.text2}>Friendly experts, here to help.</Text>
                <AskButton buttonAction={() => this.props.navigation.navigate('QuestionCategory')}
                />


                <Text></Text>
                <Text style={styles.text3}>   Recent questions</Text>
                <View style={styles.attachcontainer}>
                    <ScrollView>
                        {index.map((value, index) => {
                            return <RecentQuestion key={Math.random()} navDest={() => this.props.navigation.navigate('ChatScreen', {
                                QuID: index
                            })}
                                question={API.getQuestionWithResponsesByID(index.toString())}></RecentQuestion>
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
        backgroundColor: '#E8E8E8',
        fontFamily: 'Cabin-Regular'
    },

    text: {
        color: '#72bcd4',
        fontSize: 30,
        fontFamily: 'Cabin-Bold',

    },
    text2: {
        borderColor: '#C0C0C0',
        fontSize: 15,
        fontFamily: 'Cabin-Regular'
    },
    text3: {
        marginRight: 'auto',
        borderColor: '#000000',
        fontSize: 15,
        fontFamily: 'Cabin-Regular'
    },
    button: {
        width: 275,
        color: Colors.invertedTextColor,
        borderRadius: 300,
        padding: 16
    },
    attachcontainer: {
        padding: 10,
        flex: 1,
        width: '99%',
        backgroundColor: '#FFFFFF'
    }

});


export default withNavigation(AskScreen);
