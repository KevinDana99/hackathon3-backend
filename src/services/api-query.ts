import { URLSearchParams } from "url";
import type { ApiParams, DailyData } from "../types.js";
import { DAILY_URL, HOURLY_URL, COMMUNITY } from "../config/api.js";

async function fetchNasaPower(params: ApiParams, baseURL: string): Promise<DailyData> {
    const queryParams = new URLSearchParams();


    for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value);
    }

    queryParams.append('format', 'json');
    queryParams.append('units', 'metric');
    queryParams.append('community', COMMUNITY)

    const url = `${baseURL}?${queryParams.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${errorText}`);
        }

        const data = await response.json();
        return data.properties.parameter[params.parameters];

    } catch (error) {
        console.error('Error fetching NASA POWER data:', error);
        throw error;
    }
}

export async function fetchHourlyNasaPower(params: ApiParams): Promise<DailyData> {
    return fetchNasaPower(params, HOURLY_URL)
}

export async function fetchDailyNasaPower(params: ApiParams) {
    return fetchNasaPower(params, DAILY_URL)
}