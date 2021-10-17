import client from "./client";

const endpoint = "/meets/today";
const calendarMeets = "/meets/calendar";
const pendingMeets = "/meets/pending";

const getTodayMeets = () => client.get(endpoint);
const getCalendarMeets = () => client.get(calendarMeets);
const getPendingMeets = () => client.get(pendingMeets);

export default {
	getTodayMeets,
	getCalendarMeets,
};
