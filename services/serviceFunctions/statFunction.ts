import { DryerLog, StatsData, GraphData } from "@/constants/Objects";

/**
 * Create an object with all the statistics the stats screen could need.
 * @param logs The logs created by the dryers.
 * @param timePeriod The time period of how far back the user wants to look.
 * @returns A object with all the compiled stats.
 */
export default function createStatsDataObject(logs: DryerLog[], timePeriod: number): StatsData {
    // Need 2 logs minimum to get any stats
    if (logs.length >= 2) {
        // Get the first and last log of current period
        const lastLogCurrentPeriod: DryerLog = findLastLog(logs);
        const logsOfCurrentPeriod: DryerLog[] = findLogsOfCurrentPeriod(logs, lastLogCurrentPeriod!, timePeriod)
        const firstLogOfCurrentPeriod: DryerLog = findFirstLog(logsOfCurrentPeriod)

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
                generateHourlyGraphData(logsOfCurrentPeriod, "temperature") :
                generateDailyGraphData(logsOfCurrentPeriod, "temperature", Number(timePeriod)),
            humidityPeriodArray: timePeriod === 1 ?
                generateHourlyGraphData(logsOfCurrentPeriod, "humidity") :
                generateDailyGraphData(logsOfCurrentPeriod, "humidity", Number(timePeriod)),
        };
    } else {
        return emptyObject();
    }
}

/**
 * An empty object for when there is an error or not enough logs.
 * @returns An empty StatsData object
 */
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

/**
 * Check to see if a log is usable
 * @param log The log that needs to be valid for use
 * @returns True if the log is valid
 */
function isLogValidForUse(log:DryerLog) : boolean{
    if (log === undefined || log === null) return false;
    if (log.humidity === undefined && log.humidity === null) return false;
    if (log.temperature === undefined && log.temperature === null) return false;
    if (log.completedCycles === undefined && log.completedCycles === null) return false;
    if (log.timestamp === undefined && log.timestamp === null) return false;
    return true;
}

/**
 * Get all logs of for example, last week when you want to compare them to the stats of this week
 * @param logs All of the logs given to createStatsDataObject
 * @param lastLogOfCurrentPeriod The last log of the current period to help figure out what day/time it is.
 * @param timeFrameInDays How far back the user wants to look
 * @returns A list of logs of the previous period
 */
function findLogsOfPreviousPeriod( logs: DryerLog[], lastLogOfCurrentPeriod: DryerLog, timeFrameInDays: number ): DryerLog[] {
    const endTimestamp:Date = lastLogOfCurrentPeriod.timestamp;
    const cutOff:Date = new Date(endTimestamp);
    cutOff.setDate(cutOff.getDate() - timeFrameInDays);

    return logs.filter(log => log.timestamp.getTime() <= cutOff.getTime());
}

/**
 * Get all logs of for example, this week
 * @param logs All of the logs given to createStatsDataObject
 * @param lastLogOfCurrentPeriod The last log of the current period to help figure out what day/time it is.
 * @param timeFrameInDays How far back the user wants to look
 * @returns A list of logs of the current period
 */
function findLogsOfCurrentPeriod( logs: DryerLog[], lastLogOfCurrentPeriod: DryerLog, timeFrameInDays: number ): DryerLog[] {
    const endTimestamp:Date = lastLogOfCurrentPeriod.timestamp;
    const cutOff:Date = new Date(endTimestamp);
    cutOff.setDate(cutOff.getDate() - timeFrameInDays);

    return logs.filter(log => log.timestamp.getTime() > cutOff.getTime());
}

/**
 * Find the latest log in the list using the timestamps
 * @param logs the logs you want to look through
 * @returns the last log in the list (by timestamp)
 */
function findLastLog(logs:DryerLog[]):DryerLog {
    let log:DryerLog = logs[0];
    logs.forEach(item => {
        if(log.timestamp < item.timestamp) {
            log = item;
        }
    })
    return log;
}

/**
 * Find the first log in the list using the timestamps
 * @param logs the logs you want to look through
 * @returns the first log in the list (by timestamp)
 */
function findFirstLog(logs:DryerLog[]):DryerLog{
    let log:DryerLog = logs[0];
    logs.forEach(item => {
        if(log.timestamp > item.timestamp) {
            log = item;
        }
    })
    return log;
}

/**
 * Calculate how much humidity was reduced between the earliest log and the latest in a period
 * @param earliest the humidity in the earliest log.
 * @param latest the humidity in the last log
 * @returns differance between earliest and latest in percentage
 */
function calculateHumidtyReduction(earliest:number, latest:number) : number {
    if(earliest === null || latest === null || earliest === 0) return 0;
    const percentage:number = ((earliest - latest) / earliest) * 100
    return Number(percentage.toFixed(2));
}

/**
 * Calculate how many cycles were completed between the earliest and latest log in a period
 * @param earliest the completed cycles in the earliest log.
 * @param latest the completed cycles in the last log
 * @returns differance between earliest and latest completed cycles
 */
function calculateCycles(earliest:number, latest:number) : number {
    if(earliest === null || latest === null || earliest === 0) return 0;
    const cycles:number = latest - earliest;
    return Number(cycles.toFixed(2));
}

/**
 * Calculate the difference in humidity reduction in current and previous period
 * @param currentPeriodReduction the percentage of humidity in the current period
 * @param previousPeriodReduction the percentage of humidity in the previous period
 * @returns the differece between the 2 percentages
 */
function calculateWRTHumidity(currentPeriodReduction:number, previousPeriodReduction:number) :number {
    if(currentPeriodReduction === null || previousPeriodReduction === null) return 0;
    const humidity:number = currentPeriodReduction - previousPeriodReduction;
    return Number(humidity.toFixed(2));
}

/**
 * Calculate the difference in cycles executed in current and previous period
 * @param currentCompletedCycles the completed cycles in the current period
 * @param previousCompletedCycles the completed cycles in the previous period
 * @returns the diffence between the 2 numbers
 */
function calculateWRTCycles(currentCompletedCycles:number, previousCompletedCycles:number) : number {
    if(currentCompletedCycles === null || previousCompletedCycles === null) return 0;
    const cycles:number = currentCompletedCycles - previousCompletedCycles;
    return Number(cycles.toFixed(2));
}

/**
 * Generate the data needed for a graph showing the last 24 hours
 * @param data The logs for the needed to make the GraphData
 * @param dataType temperature or humidity
 * @returns A object with the arrays needed to fill a graph
 */
function generateHourlyGraphData(data: DryerLog[], dataType: string): GraphData {
    if(data.length < 1) return {timestamp: [], value: []};
    const timestamps: string[] = [];
    const values: number[] = [];
    const dataMap: Map<number, number[]> = new Map();

    // Get the hour and the values of logs in that hour
    data.forEach(log => {
        const hour:number = log.timestamp.getHours();
        const value:number | null =
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

        const valuesForHour:number[] = dataMap.get(hour) || [];
        const avg:number =
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

/**
 * Generate the data needed for a graph showing the last N days (e.g., 7 or 31 days)
 * @param data The logs for the needed to make the GraphData
 * @param dataType temperature or humidity
 * @returns A object with the arrays needed to fill a graph
 */
function generateDailyGraphData(
    data: DryerLog[],
    dataType: "temperature" | "humidity",
    daysBack: number
): GraphData {
    if(data.length < 1) return {timestamp: [], value: []};
    const dataMap: Map<string, number[]> = new Map();

    const endDate:Date = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate:Date = new Date(endDate);
    startDate.setDate(endDate.getDate() - (daysBack - 1));

    // Get the days and the values of logs in that day
    data.forEach(log => {
        const logDate:Date = new Date(log.timestamp);
        logDate.setHours(0, 0, 0, 0);

        if (logDate >= startDate && logDate <= endDate) {
        const key:string = logDate.toISOString().split("T")[0];
        const value:number = dataType === "temperature" ? log.temperature : log.humidity;

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
        let d:Date = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
    ) {
        const key:string = d.toISOString().split("T")[0];
        const label:string = `${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
        .getDate()
        .toString()
        .padStart(2, "0")}`;

        const valuesForDay:number[] = dataMap.get(key) || [];
        const avg:number =
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
