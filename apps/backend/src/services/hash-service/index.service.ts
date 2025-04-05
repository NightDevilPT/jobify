import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  // 🔐 Hash the value (e.g. password or token)
  async hashValue(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  // 🔍 Compare raw value with the hashed one
  async compareValue(rawValue: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(rawValue, hashedValue);
  }
}
