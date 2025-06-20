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

  function changeDryer(dryer: string) {
    dryerChanged(dryer);
    setDryer(dryer);
  }

  function changeTimeFrame(timeFrame: string) {
    timeFrameChanged(Number(timeFrame));
    setTimeFrame(timeFrame);
  }

  useEffect(() => {
    dryerChanged(dryer);
    timeFrameChanged(Number(timeFrame));
    getDryers();
  }, []);

  async function getDryers() {
    try {
      const devices = await StatsService.getUserDevices();
      setDryers(devices);
    } catch {

    } finally {

    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.pickerWrapper, styles.leftMargin]}>
        <FilametricPicker
          label="Dryer"
          selectedValue={dryer}
          onValueChange={changeDryer}
          options={[{ label: 'All dryers', value: 'All dryers' }, ...dryers.map(d => ({ label: d.ID, value: d.ID }))]}
        />
      </View>
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