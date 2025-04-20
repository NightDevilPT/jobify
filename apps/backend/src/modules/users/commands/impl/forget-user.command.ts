import { LinkDto } from '../../dto/resend-verification.dto';

export class ForgetPasswordCommand {
  constructor(public readonly payload: LinkDto) {}
}
