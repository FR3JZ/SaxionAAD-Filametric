import RegisterInput from "@/components/Auth/RegisterInput";
import { StyleSheet, View } from "react-native";

export default function Register() {
    return (
        <View style={screenStyle.container}>
            <RegisterInput/>
        </View>
    )
}

const screenStyle = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: 'center',
    },
})