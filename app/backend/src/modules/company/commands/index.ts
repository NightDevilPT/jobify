import { CreateCompanyHandler } from "./handler/create-company.handler";
import { DeleteCompanyHandler } from "./handler/delete-company.handler";
import { UpdateCompanyHandler } from "./handler/update-company.handler";

export const CompanyCommandHandlers = [
	CreateCompanyHandler,
	UpdateCompanyHandler,
	DeleteCompanyHandler
];