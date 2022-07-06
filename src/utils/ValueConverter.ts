import moment from "moment";
const dateFormat = "DD.MM.YYYY";

export function getYearFromDateValue(date: string): string {
    if (!date) return "";

    return moment(date).year().toString();
}

export function formatDate(date: string): string {
    if (!date) return "";

    return moment(date).format(dateFormat);
}