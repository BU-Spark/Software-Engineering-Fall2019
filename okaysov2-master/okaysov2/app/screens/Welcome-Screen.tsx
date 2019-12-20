import * as React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import Colors from '../themes/defaults/colors';
import CreatAccountButton from '../components/login_button';
import AnonymousButton from '../components/Ask-Queston_Butoon';
import * as Content from '../content/welcometxt.json';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { State } from '../auth/State'
type Props = NavigationInjectedProps & {
    navigation: NavigationInjectedProps
}


class WelcomeScreen extends React.Component<Props, State> {

    render() {
        return (
            <ImageBackground source={require(`../../assets/images/background_color.png`)} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Image source={require('../../assets/images/logo.png')}
                        style={{ width: 160, height: 160 }} />




                    <Text style={styles.BuzzwordText}>{Content.okayso_buzz_word1}</Text>
                    <Text style={styles.BuzzwordText}>{Content.okayso_buzz_word2}</Text>
                    <Text style={styles.BuzzwordText}>{Content.okayso_buzz_word3}</Text>
                    <Text style={styles.BuzzwordText2}>{Content.okayso_buzz_word4}</Text>
                    <Text style={styles.titleText}>{Content.you_can}</Text>
                    <View>
                        <AnonymousButton buttonAction={() => this.props.navigation.navigate('QuestionTypeScreen')} />
                        <CreatAccountButton buttonAction={
                            () => this.props.navigation.navigate('SeeOtherConversations')}/>



                    </View>
                </View>


            </ImageBackground>

                );
            }
        
        
        
        
        }
        
        
const styles = StyleSheet.create({
                    flexContainer: {
                    flex: 1
            },
    container: {
                    flex: 1,
                justifyContent: 'center',
                alignContent: "center",
                alignItems: "center",
                marginHorizontal: 16,
                backgroundColor: Colors.transparentColor
            },
    titleText: {
                    color: Colors.buttonTextColor,
                textAlign: "center",
                fontSize: 45,
                fontFamily: "Cabin-Bold"
            },
    BuzzwordText: {
                    color: Colors.invertedTextColor,
                textAlign: "left",
                fontSize: 25,
                fontFamily: "Cabin-Regular"
            },
        
    BuzzwordText2: {
                    color: Colors.invertedTextColor,
                textAlign: "center",
                fontStyle: 'italic',
                fontSize: 25,
                fontFamily: 'Cabin-Italic'
        
            },
        
    contentText: {
                    color: Colors.invertedTextColor,
                textAlign: "center",
                fontFamily: "Cabin-Regular",
                fontSize: 25
            }
        
        
        
        
        
        
        });
        
        export default withNavigation(WelcomeScreen);
