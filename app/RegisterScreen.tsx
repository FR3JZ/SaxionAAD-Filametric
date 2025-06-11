import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from 'react';
import EmailInput from "@/components/auth/register/RequestEmailInput";
import GetPassword from "@/components/auth/register/RequestPasswordInput";
import { router } from "expo-router";
import UsernameInput from "@/components/auth/register/RequestUsername";
import VerifyInput from "@/components/auth/register/VerifyInput";
import { Auth } from "aws-amplify";
import WelcomeUser from "@/components/auth/register/WelcomeUser";

enum LoginState {GetEmail = 0, GetPassword = 1, GetUsername = 2, VerifyEmailCode = 3, WelcomeMessage = 4}

export default function Register() {
    const [currentLoginState, setLoginState] = useState<LoginState>(LoginState.GetEmail)
    const [newUserEmail, setNewUserEmail] = useState<string>("");
    const [newUserPassword, setNewUserPassword] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");

    const [signUpError, setSignUpError] = useState<string>("");
    const [sendingAccountDetails, setSendingAccountDetails] = useState<boolean>(false);

    function enteredNewEmail(email:string){
        setNewUserEmail(email);
        setLoginState(LoginState.GetPassword);
    }

    function enteredNewPassword(password:string){
        setNewUserPassword(password);
        setLoginState(LoginState.GetUsername);
    }

    async function enteredNewUsername(username:string){
        setNewUsername(username);
    }

    async function welcomeNewUser(){
        setLoginState(LoginState.WelcomeMessage);
    }

    async function sendAccounDetails() {
        if (newUsername && newUserEmail && newUserPassword){
            try {
                setSendingAccountDetails(true);
                const { user } = await Auth.signUp({
                    username: newUsername,
                    password: newUserPassword,
                    attributes: {
                        email: newUserEmail,
                    },
                    autoSignIn: { enabled: false }
                });
                setLoginState(LoginState.VerifyEmailCode);
                setSignUpError("");
            } catch (error) {
                if(error instanceof Error) checkError(error);
            } finally {
                setSendingAccountDetails(false);
            }
        }
    }


    function checkError(error:Error){
        if(error.message === "User already exists") {
            setSignUpError(error.message + ": Please use a different name.");
        } else {
            setSignUpError(error.message);
        }
        console.error("Signup error:", error.message);
    }

    function goBackToLogin() {
        router.push("/LoginScreen");
    }

    function goBackToEmail() {
        setLoginState(LoginState.GetEmail);
    }

    function goBackToPassword() {
        setLoginState(LoginState.GetPassword);
    }

    function goBackToUsername() {
        setLoginState(LoginState.GetUsername);
    }

    return (
        <View style={screenStyle.container}>
            {currentLoginState === LoginState.GetEmail && 
                <EmailInput setUserEmail={enteredNewEmail} goBack={goBackToLogin}/>
            }
            {currentLoginState === LoginState.GetPassword && 
                <GetPassword setUserPassword={enteredNewPassword} goBack={goBackToEmail}/>
            }
            {currentLoginState === LoginState.GetUsername && 
                <UsernameInput 
                    setNewUsername={enteredNewUsername} 
                    sendDetails={sendAccounDetails}
                    goBack={goBackToPassword} 
                    isSendingAccountDetails={sendingAccountDetails}
                    error={signUpError}
                />
            }
            {currentLoginState === LoginState.VerifyEmailCode && 
                <VerifyInput 
                    username={newUsername}
                    email={newUserEmail}
                    goBack={goBackToUsername}
                    welcomeNewUser={welcomeNewUser}
                />
            }

            {currentLoginState === LoginState.WelcomeMessage && 
                <WelcomeUser username={newUsername} goToLogin={goBackToLogin}/>
            }
        </View>
    )
}

const screenStyle = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
    },
})