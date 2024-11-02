// File: src/modules/experience/queries/impl/get-experience-by-profile-id.query.ts
import { Types } from 'mongoose';

export class GetExperienceByProfileIdQuery {
  constructor(public readonly userId: Types.ObjectId) {}
}
