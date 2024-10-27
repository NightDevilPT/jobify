import { Types } from "mongoose";
import { UserRequest } from "src/common/interfaces/common.interface";

export class DeleteEducationCommand {
	constructor(
	  public readonly educationId: Types.ObjectId,
	  public readonly user:UserRequest
	) {}
  }
  