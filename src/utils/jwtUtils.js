import jwt from "jsonwebtoken";

export const JWT_SECRET = "token_s3cr3t0";
export const JWT_EXPIRATION = "7mins";

export function generateToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
}

export function verifyToken (token) {
    try {
        const decoded =  jwt.verify(token, JWT_SECRET)
    return decoded
} catch (error) {
    throw new Error (`Token inválido: ${error}`)
}}