import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";
import { Ionicons } from "@expo/vector-icons";

const LoginInput = () => {
    const { logIn } = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [secureText, setSecureText] = useState(true);
    const [checked, setChecked] = useState(false);

    const [loginError, setLoginError] = useState<string>("");

    async function Login() {
        if (!isUsernameFilled()) {
            setLoginError("Please enter an username.");
            return;
        }

        if (!isPasswordFilled()) {
            setLoginError("Please enter a password.");
            return;
        }

        try {
            logIn(username, password);
            router.replace("/");
        } catch (error) {
            console.error("Login error:", error);
            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError("Something went wrong while signing in.");
            }
        }
    }

    function isUsernameFilled(): boolean {
        return username.length > 0;
    }

    function isPasswordFilled(): boolean {
        return password.length > 0;
    }

    function GoToRegisterScreen() {
        router.push("/RegisterScreen");
    }

    return (
        <View>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="gray"
                placeholder="Email Address"
                style={style.textField}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            
            <View style={style.passwordContainer}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    autoCapitalize="none"
                    placeholderTextColor="gray"
                    placeholder="Password"
                    style={{flex: 1}}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)} style={style.toggle}>
                    {secureText ? <Ionicons size={24} name='eye-sharp'/>: <Ionicons size={24} name='eye-off-sharp'/>}
                </TouchableOpacity>
            </View>

            <View style={style.optionsRow}>
                <Pressable style={style.checkboxContainer} onPress={() => setChecked(!checked)}>
                    <View style={[style.checkbox, checked && style.checked]} />
                    <Text style={style.label}>Remember me</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/")}>
                    <Text style={style.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>
            </View>

            {loginError ? <Text style={style.errorText}>{loginError}</Text> : null}

            <Pressable onPress={Login} style={style.button}>
                <Text style={style.buttonText}>Login</Text>
            </Pressable>

            <View style={style.dividerContainer}>
                <View style={style.line} />
                <Text style={style.dividerText}>or</Text>
                <View style={style.line} />
            </View>

            <View style={style.signUpRow}>
                <Text style={style.signUpQuestionText}>No Filametric account yet?</Text>
                <Pressable onPress={GoToRegisterScreen} >
                    <Text style={style.signUpText} >Sign up</Text>
                </Pressable>
            </View>
            
        </View>
    );
};

const style = StyleSheet.create({
    button: {
        height: 64,
        backgroundColor: "#FF5500",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: "#FF5500",
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontFamily: "Satoshi",
    },
    textField: {
        marginTop: 4,
        marginBottom: 4,
        height: 64,
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        fontFamily: "Satoshi",
        fontSize: 16,
        backgroundColor: "white",
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
        height: 64,
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        fontFamily: "Satoshi",
        fontSize: 16,
        backgroundColor: "white",
    },
    toggle: {
        paddingHorizontal: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#000000',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    checked: {
        backgroundColor: '#000000',
    },
    label: {
        fontSize: 16,
        fontFamily: "Satoshi",
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
        fontFamily: "Satoshi",
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    forgotPasswordText: {
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Satoshi',
        textDecorationLine: 'underline',
    },
     dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#aaa',
    },
    dividerText: {
        marginHorizontal: 8,
        color: '#555',
        fontSize: 16,
        fontFamily: 'Satoshi',
    },
    signUpRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    signUpQuestionText: {
        marginRight: 16,
        fontSize: 16,
        fontFamily: 'Satoshi',
        fontWeight: "400"
    },
    signUpText: {
        fontSize: 16,
        fontFamily: 'Satoshi',
        color: "#FF5500",
        fontWeight: "700"
    }
});

export default LoginInput;