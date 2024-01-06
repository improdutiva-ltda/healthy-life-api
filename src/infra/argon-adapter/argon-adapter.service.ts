import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class ArgonAdapterService {
  async compare(value: string, hashToCompare: string): Promise<boolean> {
    const valuesMatches = await argon.verify(hashToCompare, value);
    return valuesMatches;
  }

  async hash(value: string): Promise<string> {
    const hash = await argon.hash(value);
    return hash;
  }
}
