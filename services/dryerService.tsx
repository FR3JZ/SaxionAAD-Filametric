import API from "@/utils/API";
import authService from "./authService";
import { Device } from "@/constants/Objects";

class DryerService {
    static async getDryers() {
        try {
            const token:string = await authService.getJWT();
            const json:any = await API.request('devices', "GET", token);
            return json;
        } catch (error: any) {
            console.error("Error while retrieving devices", error);
            throw error;
        }
    }

    static async startDryer(dryerId: string, profile_id: string, mode: string) {
        const token:string = await authService.getJWT();
        const json:any = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "start",
            profile_id: profile_id,
            mode: mode
        });
    }

    static async stopDryer(dryerId: string) {
        const token:string = await authService.getJWT();
        const json:any = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "stop",
        });
    }

    static async pauseDryer(dryerId: string) {
        const token:string = await authService.getJWT();
        const json:any = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "pause",
        });
    }

    static async changeDryerWhileRunning(dryerId: string, time: number, temp: number) {
        const token:string = await authService.getJWT();
        const json:any = await API.request(`devices/${dryerId}`, "POST", token, {
            command: "start",
            duration: time,
            target_temp: temp
        });
    }

    static async deleteAllDryers() {

        try {
            const token:string = await authService.getJWT();
            const json:any = await this.getDryers();
            const devices:Device[] = turnDeviceJsonToObject(json.devices);

            const deletePromises:Promise<any>[] = devices.map(device =>
                API.request(`devices/${device.ID}`, "DELETE", token)
                    .then(response => {
                        return response;
                    })
                    .catch(error => {
                        console.error(`Failed to delete device ${device.ID}`, error);
                        return null;
                    })
            );

            await Promise.all(deletePromises);
        } catch (error) {
            console.error("Error when deleting all dryers:", error);
        }
    }
}

function turnDeviceJsonToObject(json: any): Device[] {
    return json.map((item: any) => ({
        ID: item.dryer_id,
        Shadow: item.shadow ?? null,
    }));
}

export default DryerService;