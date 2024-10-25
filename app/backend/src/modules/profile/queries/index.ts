import { GetAllProfilesHandler } from "./handler/get-all-profiles.handler";
import { GetProfileByIdHandler } from "./handler/get-profile-by-id.handler";

export const ProfileQueryHandlers = [
	GetProfileByIdHandler,
	GetAllProfilesHandler
];