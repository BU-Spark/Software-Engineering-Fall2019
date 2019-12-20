import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text, View,Image } from "react-native"
import { Card } from 'react-native-elements'

interface CategoryProps {
    favicon?: string,
    touchAction: any,
    categoryDescription?: string
    categoryHeader?: string
}

const QuestionCategory = (props: CategoryProps) => {
    return (
        <TouchableOpacity onPress={props.touchAction}>
            <Card>
                <View>
                    <View style={styles.container}>
                       <Image style={styles.image} source={require('../../assets/images/category1icon.jpg')}/>
                        {/* Icon */}
                
                        <Text> </Text>
                        <Text>{props.categoryHeader}</Text>
                    </View>
                        {/* Category information(Content and header) */}
                    <Text>{props.categoryDescription}</Text>
                    

                </View>
            </Card>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',

    },

    image:{

        width:20,
        height:20
    }

});

export default QuestionCategory;
