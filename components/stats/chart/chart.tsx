import * as React from "react";
import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import satoshi from "../../../assets/fonts/Satoshi-Black.otf"; // It imports it without problem. This is a code editor mistake.

interface Props {
    dryer: string;
    timeframe: string;
    subject: string;
}

const Chart:  React.FC<Props> = ({dryer, timeframe, subject}) => {
  const font = useFont(satoshi,12);

  const DATA = [
    {x: 1, y: 1},
    {x: 2, y: 2},
    {x: 3, y: 4},
    {x: 4, y: 8},
    {x: 5, y: 16},
    {x: 6, y: 32},
    {x: 7, y: 64},
    {x: 8, y: 32},
    {x: 9, y: 30}
  ]


  return (
    <View style={{padding: 0, height: 300, width: "100%" }}>
      <CartesianChart
        data={DATA}
        xKey="x"
        yKeys={["y"]}
        axisOptions={{
          font,
        }}
      >
        {({ points }) => (
          <>
            <Line points={points.y} color="#0086D4" strokeWidth={2} />
          </>
        )}
      </CartesianChart>
    </View>
  );
}

export default Chart;