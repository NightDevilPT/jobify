import { ApplicationModule } from "./application/application.module";
import { CompanyModule } from "./company/company.module";
import { EducationModule } from "./education/education.module";
import { ExperienceModule } from "./experience/experience.module";
import { HistoryModule } from "./history/history.module";
import { JobModule } from "./job/job.module";
import { JobtestModule } from "./jobtest/jobtest.module";
import { MessageModule } from "./message/message.module";
import { ProfileModule } from "./profile/profile.module";
import { ResumeModule } from "./resume/resume.module";
import { StatusModule } from "./status/status.module";
import { TestquestionModule } from "./testquestion/testquestion.module";
import { UserModule } from "./user/user.module";

export const AllModules  = [
	UserModule,
	ProfileModule,
	EducationModule,
	ExperienceModule,
	HistoryModule,
	JobModule,
	JobtestModule,
	TestquestionModule,
	ResumeModule,
	StatusModule,
	MessageModule,
	ApplicationModule,
	CompanyModule,
]
