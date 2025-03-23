import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import { comparePassword, generateToken } from "../utils/jwtUtils.js";

export const loginUser = async (username, password) => {
  try {
    const user = await pool.query(
      `SELECT * FROM tbl_users where username = $1`,
      [username]
    );

    if (!user.rows[0]) {
      throw new Error("Kullanıcı bulunamadı");
    }

    const userData = user.rows[0];

    const isPasswordValid = await comparePassword(password, userData.password);

    if (!isPasswordValid) {
      throw new Error("Şifre hatalı");
    }

    const token = generateToken({
      id: userData.id,
      username: userData.username,
      email: userData.email,
    });

    return {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      token: token,
    };
  } catch (error) {
    console.error("[loginUser]:", error);
    throw new Error("[loginUser]:" + error.message);
  }
};

export const registerUser = async (username, password, email) => {
  try {
    const existingUser = await pool.query(
      `SELECT * FROM tbl_users where username = $1`,
      [username]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("Username already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(String(password), salt);

    // Insert the new user into the database
    const createdUser = await pool.query(
      `INSERT INTO tbl_users (username, password, email) VALUES ($1, $2, $3) RETURNING *`,
      [username, hashPassword, email]
    );

    return createdUser.rows[0];
  } catch (error) {
    console.error("[registerUser]:", error);
    throw new Error("[registerUser]:" + error.message);
  }
};
