import * as React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import * as API from '../../api/api-wrapper'
import SignOutButton from '../components/SignOutButton';
import { NavigationInjectedProps } from 'react-navigation';
type Props = NavigationInjectedProps & {};
export class FeedScreen extends React.Component<Props> {

    render() {
        return (

            <View style={styles.container}>
                 <SignOutButton buttonAction={() => this.props.navigation.navigate('Welcome')}/>
                <Text>Feed Screen</Text>
            </View>
        );
    }
}

export class InboxScreen extends React.Component {

    render() {
        return (

            <View style={styles.container}>
            <Text>{API.getQuestionWithResponsesByID("4").responses[0].authorUser.firstName}</Text>
            </View>
        );
    }
}
export class AskScreen extends React.Component {

    render() {
        return (

            <View style={styles.container}>
            
                <Text>Ask Screen</Text>
            </View>
        );
    }
}
export class ExpertsScreen extends React.Component<Props> {

    render() {
        return (

            <View style={styles.container}>
                <SignOutButton buttonAction={() => this.props.navigation.navigate('Welcome')}/>
            
                <Text>Experts Screen</Text>
            </View>
        );
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center",
    }
});
