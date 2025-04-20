import { UpdatePasswordDto } from '../../dto/update-password-user.dto';

export class UpdatePasswordCommand {
  constructor(public readonly payload: UpdatePasswordDto) {}
}
