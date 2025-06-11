import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native"
import { Picker } from '@react-native-picker/picker';

interface Props {
    dryerChanged: (dryer: string) => void;
    timeFrameChanged: (timeFrame: string) => void;
}

const DataSelectionCard: React.FC<Props> = ({dryerChanged, timeFrameChanged}) => {
    const [dryer, setDryer] = useState<string>("All dryers");
    const [timeFrame, setTimeFrame] = useState<string>("1 day");
    const [dryers, setDryers] = useState<string[]>([]);

    function changeDryer(dryer:string) {
        dryerChanged(dryer);
        setDryer(dryer);
    }

    function changeTimeFrame(timeFrame:string) {
        timeFrameChanged(timeFrame),
        setTimeFrame(timeFrame)
    }

    useEffect(() => {
        dryerChanged(dryer);
        timeFrameChanged(timeFrame);
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.selectionWrapper, styles.leftMargin]}>
                <Picker
                    style={styles.picker}
                    selectedValue={dryer}
                    onValueChange={(item, itemIndex) => changeDryer(item)}
                >
                    <Picker.Item label="All dryers" value="All dryers" />
                    {dryers.map((item, index) => (
                    <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
                </View>
                <View style={[styles.selectionWrapper, styles.rightMargin]}>
                <Picker
                    style={styles.picker}
                    selectedValue={timeFrame}
                    onValueChange={(item, itemIndex) => changeTimeFrame(item)}
                >
                    <Picker.Item label="1 Day" value="1 Day" />
                    <Picker.Item label="7 Days" value="7 Days" />
                    <Picker.Item label="31 Days" value="31 Days" />
                </Picker>
            </View>
        </View>
    );
}

export default DataSelectionCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  selectionWrapper: {
    width: '45%',
    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  picker: {
    width: '100%',
    height: '100%',
    fontFamily: "Satoshi"
  },
  leftMargin: {
    marginLeft: 14,
  },
  rightMargin: {
    marginRight: 14,
  },
});