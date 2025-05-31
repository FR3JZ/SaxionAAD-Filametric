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
            <Picker
                style={[styles.selectionBox, styles.leftMargin]}
                selectedValue={dryer}
                onValueChange={(item, itemIndex) => changeDryer(item)}
            >
                <Picker.Item label="All dryers" value="All dryers" />
                {dryers.map((item, index) => (
                    <Picker.Item
                        key={index}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>
            <Picker
                style={[styles.selectionBox, styles.rightMargin]}
                selectedValue={timeFrame}
                onValueChange={(item, itemIndex) => changeTimeFrame(item)}
            >
                <Picker.Item label="1 Day" value="1 Day" />
                <Picker.Item label="7 Days" value="7 Days" />
                <Picker.Item label="31 Days" value="31 Days" />
            </Picker>
        </View>
    )
}

export default DataSelectionCard;

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    selectionBox: {
        width: "45%",
        height: 55,
        borderRadius: 8,
        borderWidth: 2,
        fontSize: 16,
        padding: 12
    },
    leftMargin: {
        marginLeft: 14
    },
    rightMargin: {
        marginRight: 14
    }
})