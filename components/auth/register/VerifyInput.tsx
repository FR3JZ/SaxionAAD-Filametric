import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import ErrorMessageText from "@/components/error-handling/ErrorMessageText";

interface Props {
  username: string;
  email: string;
  goBack: () => void;
  welcomeNewUser: () => void;
}

const VerifyInput: React.FC<Props> = ({ username, email, goBack, welcomeNewUser }) => {
  const numberOfFields = 6;
  const [code, setCode] = useState<string[]>(Array(numberOfFields).fill(""));
  const [verificationError, setVerificationError] = useState<string>("");

  const inputsRef = useRef<TextInput[]>([]);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval:number;
    if (timer > 0) {
        interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startTimer = () => {
    setTimer(60);
  };

    const handleChange = (text: string, index: number) => {
        if (/^\d?$/.test(text)) {
            const newCode = [...code];
            newCode[index] = text;
            setCode(newCode);

            if (text && index < numberOfFields - 1) {
                inputsRef.current[index + 1]?.focus();
            }

            if (!text && index > 0) {
                inputsRef.current[index - 1]?.focus();
            }

            const isAllFilled = newCode.every((char) => char.length === 1);
            if (isAllFilled) {
                VerifyAccount(newCode);
            }
        }
    };

    async function VerifyAccount(codeArray: string[]) {
        const verification = codeArray.join(""); 
        try {
            await Auth.confirmSignUp(username, verification);
            welcomeNewUser();
        } catch (error: any) {
            setVerificationError(
            error.message || "Er is iets misgegaan bij de verificatie."
            );
        } finally {
            startTimer();
        }
    }

    async function reSendAccounDetails() {
        if (username && timer === 0){
            try {
                await Auth.resendSignUp(username);
            } catch (error) {
                if(error instanceof Error) setVerificationError(error.message);
            } finally {
                startTimer()
            }
        }
    }

  return (
    <View style={style.container}>
        <View style={style.header}>
            <Image style={style.image} source={require('../../../assets/images/Filametric_F_Logo.png')} />
            <Text style={style.titleText}>Enter the 6-digit code we emailed you</Text>
        </View>

        <View style={style.textContainer}>
            <Text style={style.pageText}>Verify that {email} is your email to confirm it’s really you</Text>
        </View>

        <View >
            <Text style={style.promptText}>Enter code: </Text>
            <View style={style.nrRow}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            if(ref !== null){
                                inputsRef.current[index] = ref;
                            }
                        }}
                        style={style.nrInputStyle}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        autoFocus={index === 0}
                    />
                ))}
            </View>
        </View>

        <ErrorMessageText message={verificationError}/>

        <TouchableOpacity onPress={reSendAccounDetails} style={[style.button, timer > 0 && {backgroundColor: "#E7E7E7"}]}>
            {timer > 0 ? <Text style={style.buttonTextCodeSend}>Resend code in {timer} seconds</Text> : <Text style={style.buttonText}>Resend code</Text>}
        </TouchableOpacity>

        <Pressable onPress={goBack}>
            <Text style={style.goBackText}>Go back</Text>
        </Pressable>
    </View>
  );
};

export default VerifyInput;

const style = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    titleText: {
        fontFamily: "Satoshi",
        fontSize: 32,
        fontWeight: "700",
        marginTop: 24,
        textAlign: 'center'
    },
    image: {
        width: 100,
        height: 90,
        resizeMode: 'contain',
    },
    container: {
        padding: 16,
    },
    button: {
        height: 64,
        backgroundColor: "#262626",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 8,
        marginBottom: 4,
        borderRadius: 16,
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontFamily: "Satoshi",
    },
    buttonTextCodeSend: {
        color: "#5D5D5D",
        fontSize: 20,
        fontFamily: "Satoshi",
    },
    errorText: {
        color: "red",
        marginBottom: 8,
    },
    nrRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 16,
    },
    nrInputStyle: {
        width: 50,
        height: 58,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#D1D1D1",
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Satoshi",
        marginHorizontal: 4,
        color: "black",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        marginVertical: 4,
    },
    pageText: {
        fontFamily: "Satoshi",
        fontSize: 16,
        fontWeight: "500",
        color: "#888888",
        textAlign: 'center'
    },
    goBackText: {
        alignSelf: 'center',
        marginTop: 16,
        fontFamily: "Satoshi",
        fontSize: 18,
        fontWeight: "500",
    },
    promptText: {
        fontFamily: "Satoshi",
        marginTop: 16,
        fontSize: 16,
        fontWeight: "400",
        color: "#262626"
    }
});