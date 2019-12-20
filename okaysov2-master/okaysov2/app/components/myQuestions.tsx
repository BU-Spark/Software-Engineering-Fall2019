import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Question } from '../../api/apiTypes'

const MyQuestion = (props: { navDest: any, question: Question }) => {

    return (
        <TouchableOpacity onPress={props.navDest}>
            <Card >
                <View style={styles.container}>

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

    text: {
        height: 35,
        flex: 1,
        fontFamily: "Cabin-Regular",
        fontSize: 14

    }
});

export default MyQuestion
