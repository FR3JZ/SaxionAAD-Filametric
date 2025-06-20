import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface Props {
    message: string;
    style?: StyleProp<TextStyle>; 
}

const ErrorMessageText: React.FC<Props> = ({ message, style }) => {
    if(message.length < 1) return null; // Prevents showing the text when there is no message

    return (
        <Text style={[styles.errorText, style]}>{message}</Text>
    )
};

export default ErrorMessageText;

const styles = StyleSheet.create({
    errorText: {
        color: "#FF0E00",
    }
})