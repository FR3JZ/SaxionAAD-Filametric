import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

interface ManualAdjustmentsPanelProps {
  targetTemp: number;
  timeRemaining: number;
  onTempChange: (value: number) => void;
  onTimeChange: (value: number) => void;
  onDismiss: () => void;
}

const ManualAdjustmentsPanel: React.FC<ManualAdjustmentsPanelProps> = ({
  targetTemp,
  timeRemaining,
  onTempChange,
  onTimeChange,
  onDismiss,
}) => {
  const fadeAnim:Animated.Value = useRef(new Animated.Value(0)).current;
  const overlayFadeAnim:Animated.Value = useRef(new Animated.Value(0)).current;

  // Fade-in animation when the panel mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(overlayFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Fade-out animation before dismissing the panel
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(overlayFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const hours:number = Math.floor(timeRemaining / 60);
  const minutes:number = timeRemaining % 60;

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <Animated.View style={[styles.overlay, { opacity: overlayFadeAnim }]}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.panel, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Manual Adjustments</Text>

            {/* Temperature Controls */}
            <View style={styles.section}>
              <Text style={styles.label}>Target Temperature</Text>
              <View style={styles.controlRow}>
                <View style={styles.controlItem}>
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() => onTempChange(Number(targetTemp) - 1)}
                  >
                    <Text style={styles.buttonText}>–</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.controlItem}>
                  <View style={styles.valueBox}>
                    <Text style={styles.valueText}>{targetTemp}°C</Text>
                  </View>
                </View>
                <View style={styles.controlItem}>
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() => onTempChange(Number(targetTemp) + 1)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.footerText}>Range: 40°C - 90°C</Text>
            </View>

            {/* Duration Controls */}
            <View style={styles.section}>
              <Text style={styles.label}>Remaining Time</Text>
              <View style={styles.controlRow}>
                <View style={styles.controlItem}>
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() => onTimeChange(Number(timeRemaining) - 1)}
                  >
                    <Text style={styles.buttonText}>–</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.controlItem}>
                  <View style={styles.valueBox}>
                    <Text style={styles.valueText}>{timeRemaining} min</Text>
                  </View>
                </View>
                <View style={styles.controlItem}>
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() => onTimeChange(Number(timeRemaining) + 1)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.footerText}>Total: {hours}h {minutes}m</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    zIndex: 999,
    borderRadius: 17,
  },
  panel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { height: -2, width: 0 },
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
  controlItem: {
    flex: 1,
    alignItems: 'center',
  },
  adjustButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CCC',
    width: 60,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    lineHeight: 28,
  },
  valueBox: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    width: 100,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  footerText: {
    fontFamily: "Satoshi-Light",
    fontSize: 13,
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default ManualAdjustmentsPanel;
