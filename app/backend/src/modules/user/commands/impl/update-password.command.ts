// File: src/modules/user/commands/impl/update-password.command.ts

export class UpdatePasswordCommand {
	constructor(
	  public readonly token: string,
	  public readonly password: string
	) {}
  }
  