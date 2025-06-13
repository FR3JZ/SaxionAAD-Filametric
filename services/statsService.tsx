import API from "@/utils/API";
import authService from "./authService";

class StatsService {
    static async getStatsData() {
        try {
            const token = await authService.getJWT();
            const json = await API.request('telemetry?dryerId=FP0506A0009', 'GET', token);
            console.log(json);
        } catch (error: any) {
            console.error("Error while retrieving stats:", error);
            throw error;
        }
    }
}

export default StatsService;