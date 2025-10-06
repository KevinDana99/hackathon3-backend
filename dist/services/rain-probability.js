import { CORRECTION_FACTOR_FOR_RAIN_CLUSTERING, MIN_RAIN_REQUIRED_FOR_POSITIVE } from "../config/parameters.js";
export function getRainProbability(data, dayCount) {
    const daysWithRain = getDaysWithRain(data);
    const daysCount = Object.keys(data).length;
    if (daysCount === 0)
        return 0;
    const probOfRainInADay = daysWithRain / daysCount;
    const probOfNoRainInADay = 1 - probOfRainInADay;
    return 1 - ((probOfNoRainInADay) ** (dayCount * CORRECTION_FACTOR_FOR_RAIN_CLUSTERING));
}
function getDaysWithRain(data) {
    let count = 0;
    Object.entries(data).forEach(([key, data]) => {
        if (data > MIN_RAIN_REQUIRED_FOR_POSITIVE)
            count++;
    });
    return count;
}
//# sourceMappingURL=rain-probability.js.map