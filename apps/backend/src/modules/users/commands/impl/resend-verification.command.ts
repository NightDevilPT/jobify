import { ResendVerificationLinkDto } from "../../dto/resend-verification.dto";

export class ResendVerificationCommand {
  constructor(public readonly payload: ResendVerificationLinkDto) {}
}
