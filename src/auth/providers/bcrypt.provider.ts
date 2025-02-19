import { HashProvider } from './hash.provider';
import * as bcrypt from 'bcrypt';

export class BcryptProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
