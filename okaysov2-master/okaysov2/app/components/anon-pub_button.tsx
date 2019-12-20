import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text} from "react-native"
import Colors from '../themes/defaults/colors';


interface ButtonProps {
    buttonText: string,
    buttonAction: any,
    buttonColor: string
}

const Anonpubbutton = (props: ButtonProps) => {
  return (
    <TouchableOpacity
        style={styles.loginScreenButton}
        onPress={props.buttonAction}>
         <Text style={styles.loginText}>Anonymous/Public</Text>
        </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
  paddingTop: 60

},
loginScreenButton:{
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
  loginText:{
    color:'#fff',
    fontSize: 25,
    textAlign:'center',
    fontFamily: "Cabin-Bold"
}
});

export default Anonpubbutton;
