import client from "./client";

const getProfile = "/profile";

const getProfileData = () => client.get(getProfile);

export default {
	getProfileData,
};
