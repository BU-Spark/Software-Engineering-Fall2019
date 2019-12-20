import * as React from 'react'
import {Button} from "react-native"


interface ButtonProps {
    buttonText: string,
    buttonAction: any,
    buttonColor: string
}

const MainButton = (props: ButtonProps) => {
    return (
        <Button
            title={props.buttonText}
            color={props.buttonColor}
            onPress={props.buttonAction}
        />
    )
};
export default MainButton;
