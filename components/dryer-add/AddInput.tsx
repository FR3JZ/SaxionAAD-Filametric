import React from 'react';
import { View, StyleSheet, TextInput } from "react-native";


const AddInput = ({placeholder, value, onChangeText} : {placeholder: string, value: string, onChangeText: (text: string) => void}) => {
    return (
        <View>
            <TextInput
                style={styles.textField}
                placeholderTextColor={"gray"} 
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    textField: {
        width: '97%',
        height: 50,
        marginTop: 4,
        marginBottom: 4,
        padding: 8,
        borderWidth: 1,
        borderRadius: 6,
        fontSize: 17
    },
});

export default AddInput;