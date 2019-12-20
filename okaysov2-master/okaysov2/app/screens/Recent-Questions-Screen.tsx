import * as React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import RecentQuestion from '../components/RecentQuestionPublic'
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationInjectedProps } from 'react-navigation';
import { State } from '../auth/State'
import { inject, observer } from 'mobx-react';
import { RecentQuestionStoreInterface } from '.././state/RecentQuestions.State'


type Props = NavigationInjectedProps & {
    navigation: NavigationInjectedProps,
    recentQuestionStore: RecentQuestionStoreInterface
}

const recentQuestionsScreen = class extends React.Component<Props, State>{
    //Load the recent questions
    componentWillMount() {
        const props = this.props.recentQuestionStore!
        props.getRecentQuestions()
    }
    render() {
        const state = this.props.recentQuestionStore!
        if (state.isFailure) {
            return (
                <View>
                    <Text>A network error has occurred</Text>
                </View>

            )
        }
        if (state.isLoading) {
            return (
                <Text>Loading...</Text>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Recent questions</Text>
                    <View style={styles.attachcontainer}>
                        <ScrollView>
                            {state.recentQuestions.map((_, index) => {
                                return <RecentQuestion key={Math.random()} navDest={() => this.props.navigation.navigate('ChatScreen', {QuID: index})}
                                    question={state.recentQuestions[index]}/>
                            })}
                        </ScrollView>

                    </View>
                </View>
            )
        }
    }
};

export default inject('recentQuestionStore')(observer(recentQuestionsScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#E8E8E8',

    },
    attachcontainer: {
        padding: 10,
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF'
    },
    text: {
        color: '#72bcd4',
        fontSize: 30,// Normalize(30)
        fontFamily: 'Cabin-Bold',
        paddingBottom: 15,
        paddingTop: 25,
        alignItems: "center"

    }

});





