import React from 'react';
import { View, StyleSheet, TextInput } from "react-native";


const AddInput = ({placeholder, value, onChangeText} : {placeholder: string, value: string, onChangeText: (text: string) => void}) => {
    return (
        <View>
            <TextInput
                style={styles.textField}
                placeholderTextColor={"#888888"} 
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    textField: {
        width: '93%',
        height: 50,
        marginTop: 4,
        marginBottom: 10,
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 17,
        fontFamily: 'Satoshi-Regular',
        borderColor: '#E7E7E7'
    },
});

export default AddInput;