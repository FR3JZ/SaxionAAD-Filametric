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

    static async startDryer(dryerId: string, profile_id: string, mode: string) {
        const token = await authService.getJWT();
        const json = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "start",
            profile_id: profile_id,
            mode: mode
        });
    }

    static async stopDryer(dryerId: string) {
        const token = await authService.getJWT();
        const json = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "stop",
        });
    }

    static async pauseDryer(dryerId: string) {
        const token = await authService.getJWT();
        const json = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "pause",
        });
    }

    static async changeDryerWhileRunning(dryerId: string, time: number, temp: number) {
        const token = await authService.getJWT();
        const json = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "start",
            duration: time,
            target_temp: temp
        });
    }

}

export default DryerService;