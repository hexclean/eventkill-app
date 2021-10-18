import client from "./client";

const acceptMeet = "/operation/accept";
const deleteMeet = "/operation/decline";
const editName = "/profile/edit-name";
const editComp = "/profile/edit-company";

const acceptMeetHandler = meetId => client.post(acceptMeet, { meetId });
const deleteMeetHandler = meetId => client.post(deleteMeet, { meetId });
const editProfile = name => client.post(editName, { name });
const editCompany = company => client.post(editComp, { company });

export default {
	acceptMeetHandler,
	deleteMeetHandler,
	editProfile,
	editCompany,
};
