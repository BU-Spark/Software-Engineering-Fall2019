import * as React from 'react'
import { StyleSheet, TouchableOpacity, Text} from "react-native"
import Colors from '../themes/defaults/colors';


interface ButtonProps {
    buttonText?: string,
    buttonAction: any,
    buttonColor?: string
}

const CreatAccountButton = (props: ButtonProps) => {
    return (
      <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={props.buttonAction}>
           <Text style={styles.loginText}>Ask a Question</Text>
          </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  container: {
  paddingTop: 40

},
loginScreenButton:{
   marginTop:5,
   height: 50,
   width: 200,
   paddingTop: 10,
   alignItems: 'center',
  borderRadius: 15,
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor:Colors.primaryColor
  },
  loginText:{
    color:'#fff',
    fontSize: 20,
    textAlign:'center',
    fontFamily: "Cabin-Bold"
}
});

export default CreatAccountButton;
