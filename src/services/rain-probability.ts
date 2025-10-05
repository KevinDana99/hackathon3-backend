import { CORRECTION_FACTOR_FOR_RAIN_CLUSTERING, MIN_RAIN_REQUIRED_FOR_POSITIVE } from "../config/parameters.js";
import type { DailyData } from "../types.js";




export function getRainProbability(data: DailyData, dayCount: number): number {
    const daysWithRain = getDaysWithRain(data);
    const daysCount = Object.keys(data).length;
    if (daysCount === 0)
        return 0;
    const probOfRainInADay = daysWithRain / daysCount
    const probOfNoRainInADay = 1 - probOfRainInADay;
    return 1 - ((probOfNoRainInADay) ** (dayCount * CORRECTION_FACTOR_FOR_RAIN_CLUSTERING))
}

function getDaysWithRain(data: DailyData) {
    let count = 0;
    Object.entries(data).forEach(([key, data]) => {
        if (data > MIN_RAIN_REQUIRED_FOR_POSITIVE)
            count++;
    })
    return count;
}