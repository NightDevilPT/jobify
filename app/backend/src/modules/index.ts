import { EducationModule } from "./education/education.module";
import { ExperienceModule } from "./experience/experience.module";
import { HistoryModule } from "./history/history.module";
import { ProfileModule } from "./profile/profile.module";
import { UserModule } from "./user/user.module";

export const AllModules  = [
	UserModule,
	ProfileModule,
	EducationModule,
	ExperienceModule,
	HistoryModule
]