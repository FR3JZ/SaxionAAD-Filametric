import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router, useFocusEffect } from "expo-router";

const { width } = Dimensions.get("window");

const QRScannerPage = () => {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState<boolean>(false);
    const scannedRef = useRef(false);

    useFocusEffect(
        useCallback(() => {
            setScanned(false);
            scannedRef.current = false;
        }, [])
    );

    useEffect(() => {
        (async () => {
            const { status } = await Camera.getCameraPermissionsAsync();

            if (status !== "granted") {
                const { status: newStatus } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(newStatus === "granted");
            } else {
                setHasPermission(true);
            }
        })();
    }, []);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        if (scannedRef.current) return;

        scannedRef.current = true;
        setScanned(true);
        router.push({
            pathname: "/(protected)/(dryer-add)/AddNewDryerScreen",
            params: { data },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.cameraAccessContainer}>
                <View style={styles.cameraAccessTitle}>
                    <Ionicons name="camera-outline" size={25} color={'#000'} />
                    <Text style={styles.cameraAccessTitleText}>Camera Access</Text>
                </View>

                {hasPermission ? (
                    <View style={[styles.accessibilityContainer, styles.accessGrantedContainer]}>
                        <Ionicons name="checkmark" color={"#009632"} size={35} style={styles.accessibilityIcon} />
                        <View style={styles.accessibilityInfo}>
                            <Text style={styles.accessGrantedText}>Camera access granted</Text>
                            <Text style={styles.accessGrantedSubtext}>Camera is ready to scan the QR code</Text>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.accessibilityContainer, styles.accessDeniedContainer]}>
                        <Ionicons name="close" color={"#B31B1B"} size={35} style={styles.accessibilityIcon} />
                        <View style={styles.accessibilityInfo}>
                            <Text style={styles.accessDeniedText}>Camera access denied</Text>
                            <Text style={styles.accessDeniedSubtext}>Please enable camera permissions in settings</Text>
                        </View>
                    </View>
                )}
            </View>

            {hasPermission ? (
                <View style={styles.cameraContainer}>
                    <CameraView
                        style={styles.cameraView}
                        onBarcodeScanned={handleBarCodeScanned}
                        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                    />
                    <View style={styles.overlay}>
                        <View style={styles.overlayDarkTop} />
                        <View style={styles.overlayMiddleRow}>
                            <View style={styles.overlaySide} />
                            <View style={styles.overlayCenter}>
                                <View style={styles.cornerTopLeftHorizontal} />
                                <View style={styles.cornerTopLeftVertical} />

                                <View style={styles.cornerTopRightHorizontal} />
                                <View style={styles.cornerTopRightVertical} />

                                <View style={styles.cornerBottomLeftHorizontal} />
                                <View style={styles.cornerBottomLeftVertical} />

                                <View style={styles.cornerBottomRightHorizontal} />
                                <View style={styles.cornerBottomRightVertical} />
                            </View>
                            <View style={styles.overlaySide} />
                        </View>
                        <View style={styles.overlayDarkBottom} />
                    </View>
                </View>
            ) : (
                <View style={styles.cameraPlaceholder}>
                    <View style={styles.overlay}>
                        <View style={styles.overlayDarkTop} />
                        <View style={styles.overlayMiddleRow}>
                            <View style={styles.overlaySide} />
                            <View style={styles.overlayCenter}>
                                <View style={styles.cornerTopLeftHorizontal} />
                                <View style={styles.cornerTopLeftVertical} />

                                <View style={styles.cornerTopRightHorizontal} />
                                <View style={styles.cornerTopRightVertical} />

                                <View style={styles.cornerBottomLeftHorizontal} />
                                <View style={styles.cornerBottomLeftVertical} />

                                <View style={styles.cornerBottomRightHorizontal} />
                                <View style={styles.cornerBottomRightVertical} />
                            </View>
                            <View style={styles.overlaySide} />
                        </View>
                        <View style={styles.overlayDarkBottom} />
                    </View>
                </View>
            )}
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionTitle}>How to scan:</Text>
                <View style={styles.instructionLine}><View style={styles.stepContainer}><Text style={styles.stepText}>1</Text></View><Text style={styles.instructionText}>Hold your device steady and point the camera at the QR code</Text></View>
                <View style={styles.instructionLine}><View style={styles.stepContainer}><Text style={styles.stepText}>2</Text></View><Text style={styles.instructionText}>Make sure the QR code fits within the frame</Text></View>
                <View style={styles.instructionLine}><View style={styles.stepContainer}><Text style={styles.stepText}>3</Text></View><Text style={styles.instructionText}>The scanner will automatically detect the code</Text></View>
            </View>
        </View>
    );
};

const SCAN_SIZE = 220;
const CORNER_SIZE = 30;
const CORNER_THICKNESS = 4;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 15
    },
    cameraAccessContainer: {
        borderWidth: 1,
        borderColor: '#B0B0B0',
        width: '90%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingVertical: 20
    },
    cameraAccessTitle: {
        flexDirection: 'row',
        marginLeft: 18,
        marginBottom: 10
    },
    cameraAccessTitleText: {
        fontSize: 21,
        marginLeft: 15,
        fontFamily: 'Satoshi-Medium'
    },
    accessibilityContainer: {
        width: '90%',
        height: 70,
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    accessDeniedContainer: {
        backgroundColor: '#FFE3E5',
    },
    accessGrantedContainer: {
        backgroundColor: '#D5FFE4'
    },
    accessDeniedText: {
        color: '#B31B1B',
        fontSize: 20,
        fontFamily: 'Satoshi-Medium'
    },
    accessGrantedText: {
        color: '#009632',
        fontSize: 20,
        fontFamily: 'Satoshi-Medium'
    },
    accessibilityInfo: {
        marginLeft: 7,
        justifyContent: 'center'
    },
    accessibilityIcon: {
        marginLeft: 10,
        marginTop: 12
    },
    accessDeniedSubtext: {
        color: '#FF3B30',
        fontSize: 11
    },
    accessGrantedSubtext: {
        color: '#00C03B',
        fontSize: 11
    },
    cameraContainer: {
        width: '90%',
        height: 250,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 15
    },
    cameraView: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
    },
    overlayDarkTop: {
        height: (250 - SCAN_SIZE) / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    overlayDarkBottom: {
        height: (250 - SCAN_SIZE) / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    overlayMiddleRow: {
        height: SCAN_SIZE,
        flexDirection: 'row'
    },
    overlaySide: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    overlayCenter: {
        width: SCAN_SIZE,
        height: SCAN_SIZE,
        position: 'relative'
    },

    cornerTopLeftHorizontal: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: CORNER_SIZE,
        height: CORNER_THICKNESS,
        backgroundColor: '#FF5500',
    },
    cornerTopLeftVertical: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: CORNER_THICKNESS,
        height: CORNER_SIZE,
        backgroundColor: '#FF5500',
    },
    cornerTopRightHorizontal: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: CORNER_SIZE,
        height: CORNER_THICKNESS,
        backgroundColor: '#FF5500',
    },
    cornerTopRightVertical: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: CORNER_THICKNESS,
        height: CORNER_SIZE,
        backgroundColor: '#FF5500',
    },
    cornerBottomLeftHorizontal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: CORNER_SIZE,
        height: CORNER_THICKNESS,
        backgroundColor: '#FF5500',
    },
    cornerBottomLeftVertical: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: CORNER_THICKNESS,
        height: CORNER_SIZE,
        backgroundColor: '#FF5500',
    },
    cornerBottomRightHorizontal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: CORNER_SIZE,
        height: CORNER_THICKNESS,
        backgroundColor: '#FF5500',
    },
    cornerBottomRightVertical: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: CORNER_THICKNESS,
        height: CORNER_SIZE,
        backgroundColor: '#FF5500',
    },

    cameraPlaceholder: {
        width: '90%',
        height: 250,
        backgroundColor: '#5B5B5B',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 15
    },

    instructionsContainer: {
        borderWidth: 1,
        borderColor: '#B0B0B0',
        borderRadius: 10,
        width: '90%',
        height: 230,
        marginTop: 20
    },

    instructionTitle: {
        fontSize: 20,
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'Satoshi-Medium'
    },

    instructionLine: {
        display: 'flex',
        flexDirection: 'row',
        width: '88%',
        marginLeft: 15,
        marginTop: 10,
        height: 40
    },

    stepContainer: {
        width: 20,
        height: 20,
        backgroundColor: '#0086D4',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    stepText: {
        color: '#fff'
    },

    instructionText: {
        marginLeft: 10,
        fontFamily: 'Satoshi-Medium',
        fontSize: 15
    }
});

export default QRScannerPage;
