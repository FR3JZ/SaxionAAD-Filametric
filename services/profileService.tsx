import API from "../utils/API";
import authService from "./authService";

class ProfileService {
    static async getProfiles() {
        try {
            const token = await authService.getJWT();
            const json = await API.request('profiles', "GET", token);
            return json;
        } catch (error: any) {
            console.error("Error while retrieving profiles:", error);
            throw error;
        }
    }

    static async createProfile(body: any) {
        try {
            console.log(body);
            const token = await authService.getJWT();
            const json = await API.request('profiles', "POST", token, body);
            return json;
        } catch (error: any) {
            console.error("Error while trying to create a profile:", error);
            throw error;
        }
    }

    static async deleteAllProfile() {
        try {
            const token = await authService.getJWT();
            const json = await API.request(`profiles`, "DELETE", token);
            return json;
        } catch (error ){
            console.error("Error while trying to delete all profiles:", error);
        }
    }
}

export default ProfileService;
