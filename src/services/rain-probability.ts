import { MIN_RAIN_REQUIRED_FOR_POSITIVE } from "../config/parameters.js";
import type { DailyData } from "../types.js";



// Returns an array of probabilities
export function getRainProbability(data: DailyData): number {
    const daysWithRain = getDaysWithRain(data);
    const daysCount = Object.keys(data).length;
    if (daysCount === 0)
        return 0;
    return daysWithRain / daysCount
}

function getDaysWithRain(data: DailyData) {
    let count = 0;
    Object.entries(data).forEach(([key, data]) => {
        if (data > MIN_RAIN_REQUIRED_FOR_POSITIVE)
            count++;
    })
    return count;
}