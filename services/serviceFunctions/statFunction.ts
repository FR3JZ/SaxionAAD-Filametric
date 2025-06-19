import { DryerLog, StatsData, GraphData } from "@/constants/Objects";

export default function createStatsDataObject(logs: DryerLog[], timePeriod: number): StatsData {
    // Need 2 logs minimum to get any stats
    if (logs.length >= 2) {
        // Get the first and last log of current period
        const lastLogCurrentPeriod: DryerLog = findLastLog(logs);
        const firstLogOfCurrentPeriod: DryerLog = findFirstLog(findLogsOfCurrentPeriod(logs, lastLogCurrentPeriod!, timePeriod))

        // Get the first and last log of previous period
        const logsOfPreviousPeriod:DryerLog[] = findLogsOfPreviousPeriod(logs, lastLogCurrentPeriod, timePeriod)
        const lastLogOfPreviousPeriod: DryerLog = findLastLog(logsOfPreviousPeriod);
        const firstLogOfPreviousPeriod: DryerLog = findFirstLog(logsOfPreviousPeriod);

        // Prep variables.
        let currentHumidityReduction:number = 0
        let previousHumidityReduction:number = 0
        let currentCompletedCycles:number = 0
        let previousCompletedCycles:number = 0

        // Check if the required variables exist in the logs before performing calculations
        if( isLogValidForUse(firstLogOfCurrentPeriod) && isLogValidForUse(lastLogCurrentPeriod)) {
            currentHumidityReduction = calculateHumidtyReduction(firstLogOfCurrentPeriod.humidity, lastLogCurrentPeriod.humidity)
            currentCompletedCycles = calculateCycles(firstLogOfCurrentPeriod.completedCycles, lastLogCurrentPeriod.completedCycles)
        }
        if( isLogValidForUse(firstLogOfPreviousPeriod) && isLogValidForUse(lastLogOfPreviousPeriod) ) {
            previousHumidityReduction = calculateHumidtyReduction(firstLogOfPreviousPeriod.humidity, lastLogOfPreviousPeriod.humidity)
            previousCompletedCycles = calculateCycles(firstLogOfPreviousPeriod.completedCycles, lastLogOfPreviousPeriod.completedCycles)
        }
        
        // Create the object
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
        return emptyObject();
    }
}

// Create an empty object
function emptyObject() : StatsData{
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

// Check to see if a log is usable
function isLogValidForUse(log:DryerLog) : boolean{
    if (log === undefined) return false;
    if (log.humidity === undefined) return false;
    if (log.completedCycles === undefined) return false;
    return true;
}

// Get all logs of for example yesterday or last week
function findLogsOfPreviousPeriod( logs: DryerLog[], lastLogOfCurrentPeriod: DryerLog, timeFrameInDays: number ): DryerLog[] {
    const endTimestamp = lastLogOfCurrentPeriod.timestamp;
    const cutOff = new Date(endTimestamp);
    cutOff.setDate(cutOff.getDate() - timeFrameInDays);

    return logs.filter(log => log.timestamp.getTime() <= cutOff.getTime());
}

// Get all logs of for example today or this week
function findLogsOfCurrentPeriod( logs: DryerLog[], lastLogOfCurrentPeriod: DryerLog, timeFrameInDays: number ): DryerLog[] {
    const endTimestamp = lastLogOfCurrentPeriod.timestamp;
    const cutOff = new Date(endTimestamp);
    cutOff.setDate(cutOff.getDate() - timeFrameInDays);

    return logs.filter(log => log.timestamp.getTime() > cutOff.getTime());
}

// Find the latest log in the list using the dates
function findLastLog(logs:DryerLog[]):DryerLog {
    let log:DryerLog = logs[0];
    logs.forEach(item => {
        if(log.timestamp < item.timestamp) {
            log = item;
        }
    })
    return log;
}

// Find the first log in the list using the dates
function findFirstLog(logs:DryerLog[]):DryerLog{
    let log:DryerLog = logs[0];
    logs.forEach(item => {
        if(log.timestamp > item.timestamp) {
            log = item;
        }
    })
    return log;
}

// Calculate how much humidity was reduced between the earliest log and the latest in a period
function calculateHumidtyReduction(earliest:number, latest:number) : number {
    if(earliest === null || latest === null || earliest === 0) return 0;
    const percentage:number = ((earliest - latest) / earliest) * 100
    return Number(percentage.toFixed(2));
}

// Calculate how many cycles were completed between the earliest and latest log in a period
function calculateCycles(earliest:number, latest:number) : number {
    if(earliest === null || latest === null || earliest === 0) return 0;
    const cycles = latest - earliest;
    return Number(cycles.toFixed(2));
}

// Calculate the difference in humidity reduction in current and previous period
function calculateWRTHumidity(currentPeriodReduction:number, previousPeriodReduction:number) :number {
    if(currentPeriodReduction === null || previousPeriodReduction === null) return 0;
    const humidity = currentPeriodReduction - previousPeriodReduction;
    return Number(humidity.toFixed(2));
}

// Calculate the difference in cycles executed in current and previous period
function calculateWRTCycles(currentCompletedCycles:number, previousCompletedCycles:number) : number {
    if(currentCompletedCycles === null || previousCompletedCycles === null) return 0;
    const cycles = currentCompletedCycles - previousCompletedCycles;
    return Number(cycles.toFixed(2));
}

// Generate the data needed for a graph showing the last 24 hours
function generateHourlyGraphData(data: DryerLog[], dataType: string): GraphData {
    if(data.length < 1) return {timestamp: [], value: []};
    const timestamps: string[] = [];
    const values: number[] = [];
    const dataMap: Map<number, number[]> = new Map();

    // Get the hour and the values of logs in that hour
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

    // Create the timestamps
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

// Generate the data needed for a graph showing the last N days (e.g., 7 or 31 days)
function generateDailyGraphData(
    data: DryerLog[],
    dataType: "temperature" | "humidity",
    daysBack: number
): GraphData {
    if(data.length < 1) return {timestamp: [], value: []};
    const dataMap: Map<string, number[]> = new Map();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (daysBack - 1));

    // Get the days and the values of logs in that day
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

    // Create the timestamps for the days
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
