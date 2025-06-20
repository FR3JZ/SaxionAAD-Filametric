import { Auth } from "aws-amplify"

class authService {
    static async getJWT() {
        try {
            const currentSession = await Auth.currentSession();
            const token = currentSession.getIdToken().getJwtToken();
            return token;
        } catch(error: any) {
            console.error("Error while getting JWT Token", error);
            throw error;
        }
    }
}

export default authService;