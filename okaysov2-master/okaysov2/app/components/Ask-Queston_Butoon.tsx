import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text, View} from "react-native"
import Colors from '../themes/defaults/colors';


interface ButtonProps {
    buttonText?: string,
    buttonAction: any,
    buttonColor?: string
}

const AnonymousButton = (props: ButtonProps) => {
    return (
      <View style={styles.container}>
      <TouchableOpacity
          style={styles.AnonButton}
          onPress={props.buttonAction}>
           <Text style={styles.AnonText}>Ask your Question</Text>
          </TouchableOpacity>
          </View>
    )
};


const styles = StyleSheet.create({
  container: {
  paddingTop: 60

},
AnonButton:{
   marginTop:5,
   height: 80,
   width: 300,
   paddingTop: 25,
   alignItems: 'center',
  borderRadius: 15,
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor:Colors.secondaryColor
  },
  AnonText:{
    color:'#fff',
    fontSize: 25,
    textAlign:'center',
    fontFamily: "Cabin-Bold"
}
});

export default AnonymousButton;
