import API from "../utils/API";
import { Auth } from "aws-amplify";

class ProfileService {
    static async getProfiles() {
        try {
            const currentSession = await Auth.currentSession(); // 👈 Verplaatst naar functie
            const token = currentSession.getIdToken().getJwtToken();
            const json = await API.request('profiles', "GET", token);
            return json;
        } catch (error: any) {
            console.error("Fout bij ophalen profielen:", error);
            throw error;
        }
    }
}

export default ProfileService;
