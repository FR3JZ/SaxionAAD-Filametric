import * as React from "react";
import { View } from "react-native";
import { LineChart, PieChart } from 'react-native-chart-kit';

interface Props {
  dryer: string;
  timeframe: string;
  subject: string;
}

const Chart: React.FC<Props> = ({ dryer, timeframe, subject }) => {
  const [containerWidth, setContainerWidth] = React.useState(0);

  return (
    <View
      style={{ flex: 1, padding: 16 }}
      // Dynamically capture container width for responsive chart sizing
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      {subject !== "Materials" ? (
        // Line chart shown for all subjects except "Materials"
        <View>
          <LineChart
            data={{
              labels: ['1', '2', '3', '4', '5', '6', '7'],
              datasets: [{ data: [1, 2, 4, 8, 16, 32, 24] }],
            }}
            fromZero={true}
            yAxisInterval={1}
            width={containerWidth}
            height={220}
            withDots={true}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              labelColor: () => '#333',
            }}
            onDataPointClick={({ value }) => {
              console.log("Clicked:", value);
            }}
          />
        </View>
      ) : (
        // Pie chart for "Materials" subject
        <PieChart
          data={[
            { name: 'PLA', population: 51, color: '#00C03B', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'PETG', population: 32, color: '#0086D4', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'ABS', population: 11, color: '#FF2323', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          ]}
          width={containerWidth}
          height={220}
          chartConfig={{
            color: () => `rgba(0, 0, 0, 1)`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      )}
    </View>
  );
};

export default Chart;
