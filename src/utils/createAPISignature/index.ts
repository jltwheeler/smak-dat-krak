import qs from "qs";
import moment from "moment";
import { createHash, createHmac } from "crypto";

interface IReqParams extends Record<string, string | number | undefined> {
  nonce?: string;
}

interface Props {
  path: string;
  reqParams: IReqParams;
  secret: string;
  nonce?: string;
}

export const getNonceValue = () => {
  return (moment().unix() * 1000).toString();
};

export const createAPISignature = ({
  path,
  reqParams,
  secret,
  nonce,
}: Props) => {
  const message = qs.stringify(reqParams);

  const secret_buffer = Buffer.from(secret, "base64");

  const hash = createHash("sha256");
  const hmac = createHmac("sha512", secret_buffer);

  const hash_digest = hash.update(nonce + message).digest("binary");
  const hmac_digest = hmac
    .update(path + hash_digest, "binary")
    .digest("base64");

  return hmac_digest;
};
