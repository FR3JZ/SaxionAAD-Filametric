import API from "@/utils/API";
import authService from "./authService";

class DryerService {
    static async getDryers() {
        try {
            const token = await authService.getJWT();
            const json = await API.request('devices', "GET", token);
            return json;
        } catch (error: any) {
            console.error("Error while retrieving devices", error);
            throw error;
        }
    }
}

export default DryerService;