import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FilametricPicker from '../../custom/FilametricPicker';

interface Props {
  dryerChanged: (dryer: string) => void;
  timeFrameChanged: (timeFrame: string) => void;
}

const DataSelectionCard: React.FC<Props> = ({ dryerChanged, timeFrameChanged }) => {
  const [dryer, setDryer] = useState<string>('All dryers');
  const [timeFrame, setTimeFrame] = useState<string>('1 Day');
  const [dryers, setDryers] = useState<string[]>([]);

  // Called when the user selects a different dryer
  function changeDryer(dryer: string) {
    dryerChanged(dryer);
    setDryer(dryer);
  }

  // Called when the user selects a different time frame
  function changeTimeFrame(timeFrame: string) {
    timeFrameChanged(timeFrame);
    setTimeFrame(timeFrame);
  }

  useEffect(() => {
    // Notify parent of initial selection
    dryerChanged(dryer);
    timeFrameChanged(timeFrame);

    // Simulate fetching dryer list (replace with actual data source)
    setDryers(['Dryer A', 'Dryer B', 'Dryer C']);
  }, []);

  return (
    <View style={styles.container}>
      {/* Dryer selector */}
      <View style={[styles.pickerWrapper, styles.leftMargin]}>
        <FilametricPicker
          label="Dryer"
          selectedValue={dryer}
          onValueChange={changeDryer}
          options={[{ label: 'All dryers', value: 'All dryers' }, ...dryers.map(d => ({ label: d, value: d }))]}
        />
      </View>

      {/* Time frame selector */}
      <View style={[styles.pickerWrapper, styles.rightMargin]}>
        <FilametricPicker
          label="Time Frame"
          selectedValue={timeFrame}
          onValueChange={changeTimeFrame}
          options={[
            { label: '1 Day', value: '1 Day' },
            { label: '7 Days', value: '7 Days' },
            { label: '31 Days', value: '31 Days' },
          ]}
        />
      </View>
    </View>
  );
};

export default DataSelectionCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  pickerWrapper: {
    width: '45%',
  },
  leftMargin: {
    marginLeft: 14,
  },
  rightMargin: {
    marginRight: 14,
  },
});
