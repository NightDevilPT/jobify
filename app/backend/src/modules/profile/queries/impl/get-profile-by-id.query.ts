import { Types } from "mongoose";

export class GetProfileByIdQuery {
	constructor(public readonly profileId: Types.ObjectId) {}
  }