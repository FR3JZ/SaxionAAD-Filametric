import { GraphData } from "@/constants/Objects";
import * as React from "react";
import { Text, View } from "react-native";
import { LineChart, PieChart } from 'react-native-chart-kit';

interface Props {
  data: GraphData;
  subject: string;
}

const Chart: React.FC<Props> = ({ data, subject }) => {
  const [containerWidth, setContainerWidth] = React.useState(0);

  // Limit the number of x-axis labels for readability
  const maxLabels = 6;
  const totalLabels = data.timestamp.length;
  const step = Math.ceil(totalLabels / maxLabels);

  /**
   * Prevent the x axis from becoming unreadable by the amount of labels.
   */
  const filteredLabels = data.timestamp.map((label, index) =>
    index % step === 0 ? label : " "
  );

  return (
    <View>
      {data.value.length > 1 ?
        <View
          style={{ flex: 1, padding: 16 }}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setContainerWidth(width * 0.80);
          }}
        >
          {subject !== "Materials" ? (
            <View>
              <LineChart
                data={{
                  labels: filteredLabels,
                  datasets: [{ data: data.value }],
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
              />
            </View>
          ) : (
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
        :
        <View style={{ padding: 13 }}>
          <Text>No data for chart</Text>
        </View>
      }
    </View>
  );
}

export default Chart;
