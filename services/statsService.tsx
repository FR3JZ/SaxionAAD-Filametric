import API from "@/utils/API";
import authService from "./authService";
import { DryerLog, StatsData, Device } from "@/constants/Objects";
import createStatsDataObject from "./serviceFunctions/statFunction";

const limitOfEntires = "9000"

class StatsService {

    static async getStatsData(dryer:string, timePeriod:number) :Promise<StatsData> {
        try {
            const data = await this.getLogs(dryer, timePeriod);
            return createStatsDataObject(data, timePeriod);
        } catch (error: any) {
            console.error("Error while retrieving stats:", error);
            throw error;
        }
    }

    static async getUserDevices() : Promise<Device[]> {
        try {
            const token = await authService.getJWT();
            const json = await API.request('devices', 'GET', token);
            return turnDeviceJsonToObject(json.devices);
        } catch (error: any) {
            console.error("Error while retrieving devices:", error);
            throw error;
        }
    }

    static async getLogs(dryer:string, timePeriod:number): Promise<DryerLog[]> {
        let timeRange = timePeriod;
        if(timePeriod < 15) {
            timeRange = timePeriod * 2 // Double time range to get the "w.r.t. last day/week" logs needed
        }
        try {
            const token = await authService.getJWT();
            const json = await API.request(`telemetry?dryerId=${dryer}&timePeriod=${timeRange}&limit=${limitOfEntires}`, 'GET', token );
            return turnStatsDataJsonToObject(json.logs);
        } catch (error: any) {
            console.error("Error while retrieving logs:", error);
            throw error;
        }
    }

    static async getAllDeviceStats(timePeriod: number): Promise<StatsData> {
        try {
            const devices = await this.getUserDevices();

            const logPromises = devices.map(device => this.getLogs(device.ID, timePeriod));
            const allLogsPerDevice = await Promise.all(logPromises);

            const combinedLogs = allLogsPerDevice.flat();

            return createStatsDataObject(combinedLogs, timePeriod);
        } catch (error) {
            console.error("Error while getting all device stats:", error);
            throw error;
        }
    }
}

function turnStatsDataJsonToObject(json: any): DryerLog[] {
    return json.map((item: any) => ({
        temperature: item.temperature,
        humidity: item.humidity,
        completedCycles: item.completedCycles,
        timestamp: new Date(item.timestamp),
    }));
}

function turnDeviceJsonToObject(json: any): Device[] {
    return json.map((item: any) => ({
        ID: item.dryer_id,
        Shadow: item.shadow ?? null,
    }));
}

export default StatsService;