import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { jwtConfig } from "../config/token.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.jwtSecret, {
    expiresIn: Number(jwtConfig.jwtExpiration),
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.jwtSecret);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(String(password), hashedPassword);
};
