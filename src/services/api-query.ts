import { URLSearchParams } from "url";
import type { ApiParams } from "../types.js";

const BASE_URL = 'https://power.larc.nasa.gov/api/temporal/hourly/point';

export default async function fetchNasaPower(params: ApiParams) {
    const queryParams = new URLSearchParams();


    for (const [key, value] of Object.entries(params)) {
        queryParams.append(key, value);
    }

    const url = `${BASE_URL}?${queryParams.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching NASA POWER data:', error);
        throw error;
    }
}