import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const ProfileMultiPicker = () => {
    const [hours, setHours] = useState<number>(10);
    const [minutes, setMinutes] = useState<number>(0);
    const [temperature, setTemperature] = useState<number>(90);
    
    return (
        <View>
            <View></View>
        </View>
    )
}


const styles = StyleSheet.create({

});


export default ProfileMultiPicker;