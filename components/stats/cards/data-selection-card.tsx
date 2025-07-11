import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FilametricPicker from '../../custom/FilametricPicker';
import StatsService from '@/services/statsService';
import { Device } from '@/constants/Objects';

interface Props {
  dryerChanged: (dryer: string) => void;
  timeFrameChanged: (timeFrame: number) => void;
}

const DataSelectionCard: React.FC<Props> = ({ dryerChanged, timeFrameChanged }) => {
  const [dryer, setDryer] = useState<string>('All dryers');
  const [timeFrame, setTimeFrame] = useState<string>('1');
  const [dryers, setDryers] = useState<Device[]>([]);

  /**
   * Set the new dryer and inform the parent of the change.
   * @param dryer the new dryer to change to
   */
  function changeDryer(dryer: string) {
    dryerChanged(dryer);
    setDryer(dryer);
  }

  /**
   * Set the new timeframe and inform the parent of the change.
   * @param timeFrame the new timeframe to change to
   */
  function changeTimeFrame(timeFrame: string) {
    timeFrameChanged(Number(timeFrame));
    setTimeFrame(timeFrame);
  }

  // On mount: set defaults and fetch all user dryers
  useEffect(() => {
    dryerChanged(dryer);
    timeFrameChanged(Number(timeFrame));
    getDryers();
  }, []);

  /**
   * Get the users dryers to show in the dropdown.
   */
  async function getDryers() {
    try {
      const devices:Device[] = await StatsService.getUserDevices();
      setDryers(devices);
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      {/* Dryer Picker */}
      <View style={[styles.pickerWrapper, styles.leftMargin]}>
        <FilametricPicker
          label="Dryer"
          selectedValue={dryer}
          onValueChange={changeDryer}
          options={[
            { label: 'All dryers', value: 'All dryers' },
            ...dryers.map(d => ({ label: d.ID, value: d.ID }))
          ]}
        />
      </View>
      {/* Timeframe Picker */}
      <View style={[styles.pickerWrapper, styles.rightMargin]}>
        <FilametricPicker
          label="Time Frame"
          selectedValue={timeFrame}
          onValueChange={changeTimeFrame}
          options={[
            { label: '1 Day', value: '1' },
            { label: '7 Days', value: '7' },
            { label: '31 Days', value: '31' },
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
