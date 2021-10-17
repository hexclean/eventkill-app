import client from "./client";

const endpoint = "/meets/today";
const calendarMeets = "/meets/calendar";

const getListings = (a, b, c) => client.get(endpoint);
const getCalendarMeets = () => client.get(calendarMeets);

export default {
	getListings,
	getCalendarMeets,
};
