import { URLSearchParams } from "url";
import { DAILY_URL, HOURLY_URL, COMMUNITY } from "../config/api.js";
async function fetchNasaPower(params, baseURL) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value);
    }
    queryParams.append('format', 'json');
    queryParams.append('units', 'metric');
    queryParams.append('community', COMMUNITY);
    const url = `${baseURL}?${queryParams.toString()}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }
        const data = await response.json();
        return data.properties.parameter[params.parameters];
    }
    catch (error) {
        console.error('Error fetching NASA POWER data:', error);
        throw error;
    }
}
export async function fetchHourlyNasaPower(params) {
    return fetchNasaPower(params, HOURLY_URL);
}
export async function fetchDailyNasaPower(params) {
    return fetchNasaPower(params, DAILY_URL);
}
//# sourceMappingURL=api-query.js.map