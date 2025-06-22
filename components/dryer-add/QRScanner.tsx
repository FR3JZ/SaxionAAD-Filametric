import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Camera, BarcodeScanningResult, CameraView } from "expo-camera";

// Custom icon wrapper for consistent icon styling
function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={50} {...props} />;
}

// QRScanner handles permission request, shows scanner, and passes scanned data
export default function QRScanner({ onScanData }: { onScanData: (data: string) => void }) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [showCamera, setShowCamera] = useState<boolean>(false);

    // On mount: check if camera permission already granted
    useEffect(() => {
        (async () => {
            const { status } = await Camera.getCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    // Request camera access if not granted
    const requestCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");

        if (status === "granted") {
            setShowCamera(true);
        } else {
            console.error("No permissions");
        }
    };

    // Handle scanned QR code, hide scanner and return data
    const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
        setShowCamera(false);
        onScanData(data);
    };

    // Show message if permission is explicitly denied
    if (hasPermission === false) {
        return (
            <View>
                <Text>Please go to settings and allow access to the camera functionalities</Text>
            </View>
        );
    }

    // Show camera button if permission not handled yet or scanner hidden
    if (showCamera === false || hasPermission === null) {
        return (
            <View>
                <Pressable style={styles.buttonContainer} onPress={requestCameraPermissions}>
                    <Icon name="camera" color="black" />
                </Pressable>
            </View>
        );
    }

    // Fullscreen camera modal for scanning
    return (
        <Modal
            visible={showCamera}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setShowCamera(false)}
        >
            <View style={styles.modalContainer}>
                <CameraView
                    style={styles.camera}
                    facing="back"
                    onBarcodeScanned={handleBarcodeScanned}
                />
                <Pressable style={styles.closeButton} onPress={() => setShowCamera(false)}>
                    <Text style={styles.closeText}>Cancel</Text>
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#D9D9D9",
        width: 130,
        height: 75,
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000'
    },
    camera: {
        flex: 1
    },
    closeButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#d9d9d9',
        padding: 12
    },
    closeText: {
        color: 'black',
        fontSize: 16
    }
});
