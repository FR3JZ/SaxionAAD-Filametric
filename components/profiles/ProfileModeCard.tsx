import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { saveMode } from "@/stores/modeStore";

interface ProfileModeCardProps {
  title: string;
  mode: string;
  icon: ImageSourcePropType;
  shortDescription: string;
  longDescription: string;
  selected: string;
  setSelected: (text: string) => void
  dryerId: string;
  profileId: string;
}

const ProfileModeCard: React.FC<ProfileModeCardProps> = ({
  title,
  mode,
  icon,
  shortDescription,
  longDescription,
  selected,
  setSelected,
  dryerId,
  profileId
}) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }
  };

  const saveSelection = async() => {
    setSelected(mode);
    await saveMode(dryerId, profileId, mode);
  }

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 170],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity
      style={[styles.card, !expanded && styles.cardCollapsed, selected === mode && styles.selectedCard]}
      onPress={saveSelection}
    >
      <View style={styles.header}>
        <View style={styles.iconTitle}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={toggleExpand}>
          <Ionicons
            name={expanded ? "chevron-down" : "information-circle-outline"}
            size={25}
            color="#000"
          />
        </TouchableOpacity>

      </View>

      {!expanded && <Text style={styles.description}>{shortDescription}</Text>}

      {expanded && (
        <Animated.View
          style={{
            overflow: 'hidden',
            height: heightInterpolate,
            opacity: opacityInterpolate,
          }}
        >
          <Text style={styles.description}>{longDescription}</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#EFF9FF',
    borderWidth: 1,
    borderColor: '#006BAB'
  },
  cardCollapsed: {
    minHeight: 100,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 23,
  },
  description: {
    marginTop: 10,
    fontFamily: 'Satoshi-Light',
    fontSize: 16
  }
});

export default ProfileModeCard;
