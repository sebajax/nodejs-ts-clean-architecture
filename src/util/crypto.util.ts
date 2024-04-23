// module imports
import crypto, { BinaryToTextEncoding } from 'crypto';

class CryptoUtil {
  public static verifyHmac(hmac: string, hash: string): boolean {
    const providedHmac = Buffer.from(hmac, 'utf-8');
    const generatedHmac = Buffer.from(hash, 'utf-8');

    let hashEquals = false;
    // timingSafeEqual will prevent any timing attacks. arguments must be buffers
    try {
      hashEquals = crypto.timingSafeEqual(generatedHmac, providedHmac);
    } catch (error) {
      hashEquals = false;
    }
    return hashEquals;
  }

  public static createHmac(token: string, body: string): string {
    return crypto
      .createHmac('sha256', token)
      .update(body)
      .digest('base64')
      .trim();
  }

  public static genarateChecksum(
    str: string,
    algorithm: string | null,
    encoding: BinaryToTextEncoding | null
  ): string {
    return crypto
      .createHash(algorithm || 'md5')
      .update(str, 'utf8')
      .digest(encoding || 'hex');
  }
}

export default CryptoUtil;
