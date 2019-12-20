import * as React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RecentQuestions } from '../../api/interfaces'
import { observer } from 'mobx-react'

const RecentQuestionPublic = (props: { navDest: any, question: RecentQuestions }) => {

    return (


        <TouchableOpacity onPress={props.navDest}>
            <Card>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../../assets/images/icon1.jpg')} />
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.text}>{props.question.questionContent}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingBottom: 5,
        paddingLeft: 0,
        paddingTop: 0,
        alignItems: 'center'

    },

    image: {
        width: 30,
        height: 30,


    },

    text: {
        height: 35,
        flex: 1,
        fontFamily: "Cabin-Regular",
        fontSize: 14


    }
});

export default observer(RecentQuestionPublic)

