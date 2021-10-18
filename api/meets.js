import client from "./client";

const today = "/meets/today";
const calendarMeets = "/meets/calendar";
const pendingMeets = "/meets/pending";
const declinedMeets = "/meets/declined";

const getTodayMeets = () => client.get(today);
const getCalendarMeets = () => client.get(calendarMeets);
const getPendingMeets = () => client.get(pendingMeets);
const getDeclinedMeets = () => client.get(declinedMeets);

export default {
	getTodayMeets,
	getCalendarMeets,
	getPendingMeets,
	getDeclinedMeets,
};
