import { SignJWT, jwtVerify } from "jose";

export function encrypt(
  payload: Record<string, any>,
  { expirationTime = "10m" } = {}
) {
  const secretKey = process.env.AUTH_SECRET;
  const encodedKey = new TextEncoder().encode(secretKey);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey);
}

export function decrypt(token: string) {
  const secretKey = process.env.AUTH_SECRET;
  const encodedKey = new TextEncoder().encode(secretKey);

  return jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
}
