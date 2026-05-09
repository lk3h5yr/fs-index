import { createHash } from 'crypto';

/** メールアドレスを DB 保存用に SHA-256（十六進）へ。他システムのサンプルと同形式。 */
export function hashEmailForStorage(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}
