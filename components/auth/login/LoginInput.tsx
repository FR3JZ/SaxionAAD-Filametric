import { AuthContext } from "@/context/authContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const LoginInput = () => {
    const { logIn } = useContext(AuthContext);

    const [sendingLoginRequest, setSendingLoginRequest] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [secureText, setSecureText] = useState(true); // Toggles password visibility
    const [rememberUser, setRememberUser] = useState(false); // "Remember me" option

    const [loginError, setLoginError] = useState<string>("");

    /**
     * Check to see if the given input was correct.
     * Send the login request to cognito through the auth context @see {context\authContext.tsx}.
     */
    async function handleLogin() {
        setLoginError("");

        if (!username) {
            setLoginError("Please enter a username");
            return;
        }

        if (!password) {
            setLoginError("Please enter a password");
            return;
        }

        try {
            setSendingLoginRequest(true);
            await logIn(username, password, rememberUser); // Pass remember option too
        } catch (error: any) {
            console.error("LoginInput: Fout bij inloggen:", error);
            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError("Er is iets misgegaan tijdens het inloggen.");
            }
        } finally {
            setSendingLoginRequest(false);
        }
    }

    /**
     * Go to the register user screen
     */
    function goToRegisterScreen() {
        router.push("/RegisterScreen");
    }

    /**
     * Go to the password reset screen
     */
    function goToPasswordReset() {
        router.push("/PasswordReset");
    }

    return (
        <View>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="gray"
                placeholder="Name"
                style={style.textField}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            
            {/* Password field with visibility toggle */}
            <View style={style.passwordContainer}>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    autoCapitalize="none"
                    placeholderTextColor="gray"
                    placeholder="Password"
                    style={style.passwordInput}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)} style={style.toggle}>
                    {secureText ? <Ionicons size={24} name='eye-sharp'/>: <Ionicons size={24} name='eye-off-sharp'/>}
                </TouchableOpacity>
            </View>

            {loginError ? <Text style={style.errorText}>{loginError}</Text> : null}

            <View style={style.optionsRow}>
                {/* Remember me checkbox */}
                <Pressable style={style.checkboxContainer} onPress={() => setRememberUser(!rememberUser)}>
                    <View style={[style.checkbox, rememberUser && style.checked]} />
                    <Text style={style.label}>Remember me</Text>
                </Pressable>

                <Pressable onPress={goToPasswordReset}>
                    <Text style={style.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>
            </View>

            {/* Login button with loading indicator */}
            <TouchableOpacity onPress={handleLogin} style={style.button}>
                {!sendingLoginRequest ? 
                    <Text style={style.buttonText}>Sign in</Text> 
                : 
                    <ActivityIndicator style={style.loginIndicator} color="white"/>
                }
            </TouchableOpacity>

            {/* Divider line between login and sign up */}
            <View style={style.dividerContainer}>
                <View style={style.line} />
                <Text style={style.dividerText}>or</Text>
                <View style={style.line} />
            </View>

            {/* Sign up redirect */}
            <View style={style.signUpRow}>
                <Text style={style.signUpQuestionText}>No Filametric account yet?</Text>
                <Pressable onPress={goToRegisterScreen}>
                    <Text style={style.signUpText}>Sign up</Text>
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
        fontSize: 20,
        fontFamily: "Satoshi-Medium",
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
        fontSize: 20,
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
        fontSize: 25,
        backgroundColor: "white",
    },

    passwordInput: {
        flex: 1,
        fontSize: 20
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
        borderWidth: 1,
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
        fontSize: 18
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
        fontSize: 18,
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
    },
    loginIndicator: {
        width: 16,
        height: 16
    }
});

export default LoginInput;