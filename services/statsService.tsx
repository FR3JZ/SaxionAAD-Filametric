import API from "@/utils/API";
import authService from "./authService";
import { DryerLog, StatsData, Device } from "@/constants/Objects";
import createStatsDataObject from "./serviceFunctions/statFunction";

class StatsService {

    static async getStatsData(dryer:string, timePeriod:number) :Promise<StatsData> {
        let timeRange:number = timePeriod;
        if(timePeriod < 15) { 
            timeRange = timePeriod * 2
        }
        try {
            const token:string = await authService.getJWT();
            const json:any = await API.request(`telemetry?dryerId=${dryer}&timePeriod=${timeRange}`, 'GET', token );
            const data:DryerLog[] = turnStatsDataJsonToObject(json.logs);
            return createStatsDataObject(data, timePeriod);
        } catch (error: any) {
            console.error("Error while retrieving stats:", error);
            throw error;
        }
    }

    static async getUserDevices() : Promise<Device[]> {
        try {
            const token:string = await authService.getJWT();
            const json:any = await API.request('devices', 'GET', token);
            return turnDeviceJsonToObject(json.devices);
        } catch (error: any) {
            console.error("Error while retrieving devices:", error);
            throw error;
        }
    }

    static async getAllDeviceStats(timePeriod: number): Promise<StatsData> {
        let timeRange:number = timePeriod;
        if(timePeriod < 15) { 
            timeRange = timePeriod * 2
        }
        try {
            const token:string = await authService.getJWT();
            const json:any = await API.request(`telemetry?timePeriod=${timeRange}`, 'GET', token );
            const data:DryerLog[] = turnStatsDataJsonToObject(json.logs);
            return createStatsDataObject(data, timePeriod);
        } catch (error: any) {
            console.error("Error while retrieving stats:", error);
            throw error;
        }
    }
}

function turnStatsDataJsonToObject(json: any): DryerLog[] {
    return json.map((item: any) => ({
        temperature: item.temperature !== null ? item.temperature : 0,
        humidity: item.humidity !== null ? item.humidity : 0,
        completedCycles: item.completedCycles !== null ? item.completedCycles : 0,
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