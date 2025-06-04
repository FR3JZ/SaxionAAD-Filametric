import React, { useState, useEffect } from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  message: string;
  duration?: number;
  onDismiss: () => void;
}

const ErrorSnackbar: React.FC<Props> = ({ visible, message, duration = 3000, onDismiss }) => {
  const [top] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.timing(top, {
        toValue: 50,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(top, {
            toValue: -100,
            duration: 300,
            useNativeDriver: false,
          }).start(onDismiss);
        }, duration);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { top }]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Text style={styles.dismiss}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    backgroundColor: '#FF0E00',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  dismiss: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
  },
});

export default ErrorSnackbar;