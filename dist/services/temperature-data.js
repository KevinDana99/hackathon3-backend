import { format, setYear } from "date-fns";
import { fetchDailyNasaPower } from "./api-query.js";
import { filterToDesiredDates } from "../helpers/filter-to-date.js";
export async function getTempDataOfDate(latitude, longitude, startReferenceDate, endReferenceDate, value, valueType) {
    // no interesa el año que llegara desde el usuario, nos interesa buscar datos de los ultimos 15 años
    const currentYear = (new Date()).getFullYear();
    const twentyYearsAgo = currentYear - 20;
    endReferenceDate.setFullYear(currentYear);
    const startDate = setYear(startReferenceDate, twentyYearsAgo);
    const endDate = setYear(endReferenceDate, currentYear - 1);
    const queryBody = {
        end: format(endDate, 'yyyyMMdd'),
        start: format(startDate, 'yyyyMMdd'),
        latitude: latitude,
        longitude: longitude,
        parameters: 'T2M_MAX',
    };
    if (valueType === 'higherThan') {
        queryBody.higherThan = value;
        queryBody.parameters = 'T2M_MAX';
    }
    if (valueType === 'lowerThan') {
        queryBody.lowerThan = value;
        queryBody.parameters = 'T2M_MIN';
    }
    const response = await fetchDailyNasaPower(queryBody);
    const filteredData = filterToDesiredDates(response, startDate, endDate);
    return filteredData;
}
//# sourceMappingURL=temperature-data.js.map