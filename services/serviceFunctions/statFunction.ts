import { DryerLog, StatsData, GraphData } from "@/constants/Objects";

export default function createStatsDataObject(logs: DryerLog[], timePeriod: number): StatsData {
    if (logs.length >= 2) {
        const lastLogCurrentPeriod: DryerLog = findLastLog(logs);
        const firstLogOfCurrentPeriod: DryerLog = findFirstLog(findLogsOfCurrentPeriod(logs, lastLogCurrentPeriod, timePeriod))

        const logsOfPreviousPeriod:DryerLog[] = findLogsOfPreviousPeriod(logs, lastLogCurrentPeriod, timePeriod)
        const lastLogOfPreviousPeriod: DryerLog = findLastLog(logsOfPreviousPeriod);
        const firstLogOfPreviousPeriod: DryerLog = findFirstLog(logsOfPreviousPeriod);

        const currentHumidityReduction = calculateHumidtyReduction(firstLogOfCurrentPeriod.humidity, lastLogCurrentPeriod.humidity)
        const previousHumidityReduction = calculateHumidtyReduction(firstLogOfPreviousPeriod.humidity, lastLogOfPreviousPeriod.humidity)

        const currentCompletedCycles = calculateCycles(firstLogOfCurrentPeriod.completedCycles, lastLogCurrentPeriod.completedCycles)
        const previousCompletedCycles = calculateCycles(firstLogOfPreviousPeriod.completedCycles, lastLogOfPreviousPeriod.completedCycles)

        return {
            humidityReductionPercentage: currentHumidityReduction,
            completedCycles: currentCompletedCycles,
            wrtHumidity: calculateWRTHumidity(currentHumidityReduction, previousHumidityReduction),
            wrtCycles: calculateWRTCycles(currentCompletedCycles, previousCompletedCycles),
            temperaturePeriodArray: timePeriod === 1 ?
                generateHourlyGraphData(logs, "temperature") :
                generateDailyGraphData(logs, "temperature", Number(timePeriod)),
            humidityPeriodArray: timePeriod === 1 ?
                generateHourlyGraphData(logs, "humidity") :
                generateDailyGraphData(logs, "humidity", Number(timePeriod)),
        };
    } else {
        return {
            humidityReductionPercentage: 0,
            completedCycles: 0,
            wrtHumidity: 0,
            wrtCycles: 0,
            temperaturePeriodArray: {
                timestamp: [],
                value: []
            },
            humidityPeriodArray: {
                timestamp: [],
                value: []
            },
        };
    }
}


function findLogsOfPreviousPeriod( logs: DryerLog[], lastLogOfCurrentPeriod: DryerLog, timeFrameInDays: number ): DryerLog[] {
    const endTimestamp = lastLogOfCurrentPeriod.timestamp;
    const cutOff = new Date(endTimestamp);
    cutOff.setDate(cutOff.getDate() - timeFrameInDays);

    return logs.filter(log => log.timestamp.getTime() <= cutOff.getTime());
}

function findLogsOfCurrentPeriod( logs: DryerLog[], lastLogOfCurrentPeriod: DryerLog, timeFrameInDays: number ): DryerLog[] {
    const endTimestamp = lastLogOfCurrentPeriod.timestamp;
    const cutOff = new Date(endTimestamp);
    cutOff.setDate(cutOff.getDate() - timeFrameInDays);

    return logs.filter(log => log.timestamp.getTime() > cutOff.getTime());
}

function findLastLog(logs:DryerLog[]):DryerLog {
    let log:DryerLog = logs[0];
    logs.forEach(item => {
        if(log.timestamp < item.timestamp) {
            log = item;
        }
    })
    return log;
}

function findFirstLog(logs:DryerLog[]):DryerLog {
    let log:DryerLog = logs[0];
    logs.forEach(item => {
        if(log.timestamp > item.timestamp) {
            log = item;
        }
    })
    return log;
}

function calculateHumidtyReduction(earliest:number, latest:number) : number {
    const percentage:number = ((earliest - latest) / earliest) * 100
    return Number(percentage.toFixed(2));
}

function calculateCycles(earliest:number, latest:number) : number {
    const cycles = latest - earliest;
    return Number(cycles.toFixed(2));
}

function calculateWRTHumidity(currentPeriodReduction:number, previousPeriodReduction:number) :number {
    const humidity = currentPeriodReduction - previousPeriodReduction;
    return Number(humidity.toFixed(2));
}

function calculateWRTCycles(currentCompletedCycles:number, previousCompletedCycles:number) : number {
    const cycles = currentCompletedCycles - previousCompletedCycles;
    return Number(cycles.toFixed(2));
}

function generateHourlyGraphData(data: DryerLog[], dataType: string): GraphData {
    const timestamps: string[] = [];
    const values: number[] = [];
    const dataMap: Map<number, number[]> = new Map();

    data.forEach(log => {
        const hour = log.timestamp.getHours();
        const value =
        dataType === "temperature"
            ? log.temperature
            : dataType === "humidity"
            ? log.humidity
            : null;

        if (value !== null) {
        if (!dataMap.has(hour)) {
            dataMap.set(hour, []);
        }
        dataMap.get(hour)!.push(value);
        }
    });

    for (let hour = 0; hour < 24; hour++) {
        timestamps.push(`${hour.toString().padStart(2, "0")}:00`);

        const valuesForHour = dataMap.get(hour) || [];
        const avg =
        valuesForHour.length > 0
            ? +(valuesForHour.reduce((sum, v) => sum + v, 0) / valuesForHour.length).toFixed(2)
            : 0;

        values.push(avg);
    }

    return {
        timestamp: timestamps,
        value: values,
    };
}

function generateDailyGraphData(
    data: DryerLog[],
    dataType: "temperature" | "humidity",
    daysBack: number
): GraphData {
    const dataMap: Map<string, number[]> = new Map();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (daysBack - 1));

    data.forEach(log => {
        const logDate = new Date(log.timestamp);
        logDate.setHours(0, 0, 0, 0);

        if (logDate >= startDate && logDate <= endDate) {
        const key = logDate.toISOString().split("T")[0];
        const value = dataType === "temperature" ? log.temperature : log.humidity;

        if (!dataMap.has(key)) {
            dataMap.set(key, []);
        }
        dataMap.get(key)!.push(value);
        }
    });

    const timestamps: string[] = [];
    const values: number[] = [];

    for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
    ) {
        const key = d.toISOString().split("T")[0];
        const label = `${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
        .getDate()
        .toString()
        .padStart(2, "0")}`;

        const valuesForDay = dataMap.get(key) || [];
        const avg =
        valuesForDay.length > 0
            ? +(valuesForDay.reduce((a, b) => a + b, 0) / valuesForDay.length).toFixed(2)
            : 0;

        timestamps.push(label);
        values.push(avg);
    }

    return {
        timestamp: timestamps,
        value: values,
    };
}
