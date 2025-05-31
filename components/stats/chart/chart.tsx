import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryTooltip } from 'victory';

interface Props {
    dryer: string;
    timeframe: string;
    subject: string;
}

const chart:  React.FC<Props> = ({dryer, timeframe, subject}) => {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <VictoryChart
        height={300}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `day: ${datum.x}\ntemp: ${datum.y}`}
            labelComponent={<VictoryTooltip cornerRadius={5} flyoutStyle={{ fill: '#fff' }} />}
          />
        }
      >
        <VictoryLine
          data={data}
          style={{
            data: { stroke: '#0086D4', strokeWidth: 2 },
          }}
        />
      </VictoryChart>
    </View>
  );
}

export default chart;