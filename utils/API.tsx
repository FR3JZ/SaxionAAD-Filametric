const API_URL:string | undefined = process.env.EXPO_PUBLIC_API_URL;

class API {
  static async request(
    endpoint: string,
    method: string,
    token: string,
    body?: any,
  ): Promise<any> {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };
    let response:Response = await fetch(`${API_URL}${endpoint}`, options);


    if (!response.ok) {
        const json:any = await response.json();
        throw new Error(json.msg || "An error occurred.");
    }

    // Make sure the response.json is not returned when the status is 204 (no body)
    return response.status !== 204 ? response.json() : null;
  }
}

export default API;
