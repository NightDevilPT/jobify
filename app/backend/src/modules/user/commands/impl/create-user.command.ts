import { UserType } from "src/common/interfaces/common.interface";

export class CreateUserCommand {
	constructor(
	  public readonly username: string,
	  public readonly email: string,
	  public readonly password: string,
	  public readonly userType: UserType
	) {}
  }
  