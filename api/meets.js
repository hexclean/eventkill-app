import client from "./client";

const today = "/meets/today";
const calendarMeets = "/meets/calendar";
const pendingMeets = "/meets/pending";
const declinedMeets = "/meets/declined";
const createNewMeet = "/meets/create";
const checkMeetStatus = "meets/check-status/";
const deleteMeet = "operation/delete/";

const getTodayMeets = () => client.get(today);
const getCalendarMeets = () => client.get(calendarMeets);
const getPendingMeets = () => client.get(pendingMeets);
const getDeclinedMeets = () => client.get(declinedMeets);
const getMeetStatus = meetId => client.get(checkMeetStatus + meetId);
const postDeleteMeet = meetId => client.post(deleteMeet + meetId);

const createMeet = meet => {
	return client.post(createNewMeet, meet);
};

export default {
	getTodayMeets,
	getCalendarMeets,
	getPendingMeets,
	getDeclinedMeets,
	createMeet,
	getMeetStatus,
	postDeleteMeet,
};
