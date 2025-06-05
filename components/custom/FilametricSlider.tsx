import React from "react";
import { Slider } from "@react-native-assets/slider";

interface FilametricSliderProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const FilametricSlider: React.FC<FilametricSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  return (
    <Slider
      value={value}
      onValueChange={onChange}
      minimumValue={min}
      maximumValue={max}
      step={step}
      thumbSize={25}
      trackHeight={15}
      thumbTintColor="#5D5D5D"
      minimumTrackTintColor="#5D5D5D"
      maximumTrackTintColor="#E7E7E7"
      thumbStyle={{
        borderWidth: 3,
        borderColor: "#5D5D5D",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}
    />
  );
};

export default FilametricSlider;
