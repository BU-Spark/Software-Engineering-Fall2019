import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text} from "react-native"
import Colors from '../themes/defaults/colors';


interface ButtonProps {
    buttonText?: string,
    buttonAction: any,
    buttonColor?: string
    buttonHeight?: number,
    buttonWidth?: number,
    buttonPadding?:number,
    buttonPaddingTop?:number

}

const GenericButton = (props: ButtonProps) => {
  return (
    <TouchableOpacity
        style={styles.loginScreenButton}
        onPress={props.buttonAction}>

         <Text style={styles.loginText}>{props.buttonText}</Text>
        </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
  paddingTop: 60 //40

},
loginScreenButton:{
   marginTop:5,
   height: 80, //50
   width: 300, //200
   paddingTop: 25, //10
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

export default GenericButton;
