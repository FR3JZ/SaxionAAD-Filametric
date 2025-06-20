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

    /**
     * sets the new email and goes to the GetPassword LoginState
     * @param email - The new users email
     */
    function enteredNewEmail(email:string){
        setNewUserEmail(email);
        setLoginState(LoginState.GetPassword);
    }
    
    /**
     * sets the new password and goes to the GetUsername LoginState
     * @param password - The new users username
     */
    function enteredNewPassword(password:string){
        setNewUserPassword(password);
        setLoginState(LoginState.GetUsername);
    }

    /**
     * This is called by the UsernameInput component to set the username
     * @param username - The new users username
     */
    function enteredNewUsername(username:string){
        setNewUsername(username);
    }

    /**
     * Go to the WelcomeMessage LoginState when user is verified
     */
    async function welcomeNewUser(){
        setLoginState(LoginState.WelcomeMessage);
    }

    /**
     * Send the new users information to cognito.
     * If user can be made it will also trigger an email with the verification code.
     * Then goes to the code VerifyEmailCode LoginState.
     */
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

    /**
     * Check to see if there is an error and give a more clear message in one case
     * @param error the error object that was thrown
     */
    function checkError(error:Error){
        if(error.message === "User already exists") {
            setSignUpError(error.message + ": Please use a different name.");
        } else {
            setSignUpError(error.message);
        }
        console.error("Signup error:", error.message);
    }

    /**
     * Send the user back to the login screen
     */
    function goBackToLogin() {
        router.push("/LoginScreen");
    }

    /**
     * Send the user back to the GetEmail screen state
     */
    function goBackToEmail() {
        setLoginState(LoginState.GetEmail);
    }

    /**
     * Send the user back to the GetPassword screen state
     */
    function goBackToPassword() {
        setLoginState(LoginState.GetPassword);
    }

    /**
     * Send the user back to the GetUsername screen state
     */
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