import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { saveProfile } from '@/stores/profileStore';

type ProfilesListProps = {
  profiles: any[];
  selected?: any;
  setSelected?: (profile: any) => void;
  dryerId?: string;
};

const ProfilesList = ({ profiles, selected, setSelected, dryerId }: ProfilesListProps) => {
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});
  const [animations, setAnimations] = useState<{ [key: string]: Animated.Value }>({});

  // Reset state and create animation values when screen is focused
  useFocusEffect(
    useCallback(() => {
      setOpenStates({});
      setAnimations({});

      const newAnimations: { [key: string]: Animated.Value } = {};
      profiles.forEach(profile => {
        newAnimations[profile.id] = new Animated.Value(0);
      });

      setAnimations(newAnimations);
    }, [profiles])
  );

  // Toggle expand/collapse animation for a specific profile
  const toggleProfile = (profileID: string) => {
    const isOpen = openStates[profileID];
    const newValue = !isOpen;
    setOpenStates(prev => ({ ...prev, [profileID]: newValue }));

    if (animations[profileID]) {
      Animated.timing(animations[profileID], {
        toValue: newValue ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // Save selected profile to local state and optionally to the profile store
  const selectProfile = async (profile: any) => {
    if (setSelected) {
      setSelected(profile);

      if (dryerId) {
        await saveProfile(dryerId, profile);
      }
    }
  };

  return (
    <View>
      <View style={styles.profilesContainer}>
        {profiles.map(profile => {
          const animatedHeight = animations[profile.id]
            ? animations[profile.id].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 380],
              })
            : new Animated.Value(0);

          const isOpen = openStates[profile.id];

          return (
            <TouchableOpacity key={profile.id} onPress={() => selectProfile(profile)}>
              <View
                style={[
                  styles.closedProfile,
                  selected?.id === profile.id && styles.selectedProfile,
                ]}
              >
                <View style={styles.closedProfileTitle}>
                  <View style={styles.closedProfileTitleName}>
                    <Ionicons
                      name={profile.customizable ? 'person-outline' : 'star-outline'}
                      size={25}
                      color={profile.customizable ? '#723BFF' : '#F6B900'}
                    />
                    <Text style={styles.closedProfileTitleText}>{profile.name}</Text>
                  </View>
                  <Pressable onPress={() => toggleProfile(profile.id)}>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'information-circle-outline'}
                      size={22}
                      color={'#5D5D5D'}
                    />
                  </Pressable>
                </View>

                {!isOpen && (
                  <View style={styles.closedProfileInfo}>
                    <View style={styles.closedProfileTemperature}>
                      <Ionicons name='thermometer' size={22} color={'#5D5D5D'} />
                      <Text style={styles.closedProfileInfoText}>
                        {profile.normal.target_temperature} °C
                      </Text>
                    </View>
                    <View style={styles.closedProfileTime}>
                      <Ionicons name='time-outline' size={22} color={'#5D5D5D'} />
                      <Text style={styles.closedProfileInfoText}>
                        {Math.floor(profile.normal.duration / 60)}h {profile.normal.duration % 60}m
                      </Text>
                    </View>
                  </View>
                )}

                {/* Animated expansion section with all mode details */}
                <Animated.View
                  style={[{ overflow: 'hidden', height: animatedHeight }, styles.shadow]}
                >
                  <View style={styles.openedProfileModes}>
                    <View style={styles.openedProfileModesContent}>
                      <Text style={styles.openedProfileText}>Available modes:</Text>

                      {/* Normal Mode */}
                      <View style={styles.openedProfileMode}>
                        <View style={styles.openedProfileTitle}>
                          <Image
                            source={require("../../assets/images/normal_mode_icon.png")}
                            style={styles.openedProfileIconImage}
                            resizeMode='contain'
                          />
                          <Text style={styles.openedProfileModeText}>Normal Mode:</Text>
                        </View>
                        <View style={styles.openedProfileTemp}>
                          <Ionicons name='thermometer' size={15} style={styles.openedProfileIcon} />
                          <Text style={styles.openedProfileModeText}>
                            {profile.normal.target_temperature}°C
                          </Text>
                        </View>
                        <View style={styles.openedProfileTime}>
                          <Ionicons name='time-outline' size={15} style={styles.openedProfileIcon} />
                          <Text style={styles.openedProfileModeText}>
                            {Math.floor(profile.normal.duration / 60)}h {profile.normal.duration % 60}m
                          </Text>
                        </View>
                      </View>

                      {/* Silent Mode */}
                      <View style={styles.openedProfileMode}>
                        <View style={styles.openedProfileTitle}>
                          <Image
                            source={require("../../assets/images/silent_mode_icon.png")}
                            style={styles.openedProfileIconImage}
                            resizeMode='contain'
                          />
                          <Text style={styles.openedProfileModeText}>Silent Mode:</Text>
                        </View>
                        <View style={styles.openedProfileTemp}>
                          <Ionicons name='thermometer' size={15} style={styles.openedProfileIcon} />
                          <Text style={styles.openedProfileModeText}>
                            {profile.silent.target_temperature}°C
                          </Text>
                        </View>
                        <View style={styles.openedProfileTime}>
                          <Ionicons name='time-outline' size={15} style={styles.openedProfileIcon} />
                          <Text style={styles.openedProfileModeText}>
                            {Math.floor(profile.silent.duration / 60)}h {profile.silent.duration % 60}m
                          </Text>
                        </View>
                      </View>

                      {/* Storage Mode */}
                      <View style={styles.openedProfileMode}>
                        <View style={styles.openedProfileTitle}>
                          <Image
                            source={require("../../assets/images/storage_mode_icon.png")}
                            style={styles.openedProfileIconImage}
                            resizeMode='contain'
                          />
                          <Text style={styles.openedProfileModeText}>Storage Mode:</Text>
                        </View>
                        <View style={styles.openedProfileTemp}>
                          <Ionicons name='thermometer' size={15} style={styles.openedProfileIcon} />
                          <Text style={styles.openedProfileModeText}>
                            {profile.storage.target_temperature}°C
                          </Text>
                        </View>
                        <View style={styles.openedProfileTime}>
                          <Ionicons name='time-outline' size={15} style={styles.openedProfileIcon} />
                          <Text style={styles.openedProfileModeText}>
                            {Math.floor(profile.storage.duration / 60)}h {profile.silent.duration % 60}m
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Compatible materials and notes (currently hardcoded) */}
                  <View style={styles.openedProfileCompatibleMats}>
                    <Text style={styles.openedProfileText}>Compatible Materials:</Text>
                    <View style={styles.openedProfileMaterial}>
                      <Text style={styles.openedProfileMaterialText}>PVB</Text>
                    </View>
                  </View>

                  <View style={styles.openedProfileNotes}>
                    <Text style={styles.openedProfileText}>Notes:</Text>
                    <Text style={styles.openedProfileNotesText}>Water-soluble support material.</Text>
                  </View>
                </Animated.View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    titleContainer: {
        width: '90%',
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginTop: 20,
    },
    titleText: {
        fontSize: 23,
        marginRight: 10,
        color: '#262626'
    },
    titleProfileAmount: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 30,
        borderWidth: 1,
        borderColor: '#B0B0B0',
        borderRadius: 30,
        backgroundColor: "#fff"
    },
    titleProfileAmountText: {
        fontSize: 17
    },
    profilesContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    closedProfile: {
        width: '90%',
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    selectedProfile: {
        backgroundColor: '#EFF9FF',
        borderWidth: 1,
        borderColor: '#006BAB'
    },

    closedProfileTitle: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        width: '93%',
        justifyContent: 'space-between'
    },
    closedProfileTitleName: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%'
    },
    closedProfileTitleText: {
        fontSize: 23,
        marginLeft: 10,
        color: '#262626'
    },
    closedProfileInfo: {
        flexDirection: 'row',
        marginLeft: 8,
        marginTop: 10,
        marginBottom: 10
    },
    closedProfileTemperature: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80
    },
    closedProfileTime: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    closedProfileInfoText: {
        marginLeft: 5,
        fontSize: 18,
        color: '#5D5D5D'
    },
    openedProfileIconImage: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    openedProfileModes: {
        marginTop: 10,
        marginLeft: 10,
        width: '92%',
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        paddingBottom: 20
    },
    openedProfileModesContent: {
        width: '100%'
    },
    openedProfileText: {
        fontSize: 18
    },
    openedProfileMode: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        flexWrap: 'nowrap'
    },
    openedProfileTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1.3,
        flexShrink: 1
    },
    openedProfileTemp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 0.6
    },
    openedProfileTime: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 0.8
    },
    openedProfileModeText: {
        color: '#5D5D5D',
        fontSize: 16,
        marginLeft: 1,
        flexShrink: 1,
        flexWrap: 'nowrap'
    },
    openedProfileIcon: {
        color: '#5D5D5D'
    },
    openedProfileCompatibleMats: {
        marginTop: 15,
        marginLeft: 15,
        width: '92%',
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        paddingBottom: 20
    },
    openedProfileMaterial: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 13
    },
    openedProfileMaterialText: {
        fontSize: 16
    },
    openedProfileNotes: {
        marginTop: 15,
        marginLeft: 15,
        width: '92%',
        paddingBottom: 15
    },
    openedProfileNotesText: {
        color: '#5D5D5D',
        marginTop: 10,
        fontSize: 15
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    }
});

export default ProfilesList;
