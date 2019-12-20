import * as React from 'react'
import {StyleSheet, TouchableOpacity, Text} from "react-native"

interface ButtonProps {
  
  buttonAction: any
  
}
const SignOutButton = (props: ButtonProps) => {
  return (
 <TouchableOpacity
      style={styles.signoutposition}

     onPress={props.buttonAction}>
      <Text style={styles.sigouttext}>Signout</Text>
  </TouchableOpacity>
  )};

const styles = StyleSheet.create({
  
  signoutposition:{
      alignItems:"center",
      position:"absolute",
      right:0,
      top:0,
      marginTop:7,
      marginRight:10,
      borderRadius: 15,
      height: 25, //50
      width: 80, //200      
      backgroundColor:"#a9a9a9",
  },
  sigouttext:{
      textAlign:"center",
      color:"white",
      fontSize:15,
      fontFamily:'Cabin-Regular',
  },
  

});

export default SignOutButton;