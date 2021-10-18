import client from "./client";

const acceptMeet = "/operation/accept";
const deleteMeet = "/operation/decline";

const acceptMeetHandler = meetId => client.post(acceptMeet, { meetId });
const deleteMeetHandler = meetId => client.post(deleteMeet, { meetId });

export default {
	acceptMeetHandler,
	deleteMeetHandler,
};
