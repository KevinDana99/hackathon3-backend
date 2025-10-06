import { format, setYear } from "date-fns";
import { fetchDailyNasaPower } from "./api-query.js";
import { filterToDesiredDates } from "../helpers/filter-to-date.js";
export async function getRainDataOfDate(latitude, longitude, startReferenceDate, endReferenceDate) {
    // no interesa el año que llegara desde el usuario, nos interesa buscar datos de los ultimos 15 años
    const currentYear = (new Date()).getFullYear();
    const twentyYearsAgo = currentYear - 20;
    endReferenceDate.setFullYear(currentYear);
    const startDate = setYear(startReferenceDate, twentyYearsAgo);
    const endDate = setYear(endReferenceDate, currentYear - 1);
    const response = await fetchDailyNasaPower({
        end: format(endDate, 'yyyyMMdd'),
        start: format(startDate, 'yyyyMMdd'),
        latitude: latitude,
        longitude: longitude,
        parameters: 'PRECTOTCORR'
    });
    const filteredData = filterToDesiredDates(response, startDate, endDate);
    return filteredData;
}
//# sourceMappingURL=rain-data.js.map