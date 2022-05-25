import { PaginatedQuery, PaginatedResponse } from "../../interfaces/query";
import DB from "../../utils/database";
import { User } from "./user.model";

/**
 * @description create user
 * @param user: User
 * @returns Promise<User>
 */
const createUser = async (user: User): Promise<User> => {
  const queryTest = `INSERT INTO users (name, color, avatar, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const result = await DB.query(queryTest, [
    user.name,
    user.color,
    user.avatar ?? null,
    user.email,
    user.password,
  ]);
  return result.rows[0];
};

/**
 * @description get all users
 * @returns Promise<User[]>
 */
const getAllUsers = async (q?: PaginatedQuery): Promise<PaginatedResponse<User>> => {
  const queryTest = `SELECT * FROM users LIMIT $1 OFFSET $2`;
  const result = await DB.query(queryTest, [q?.limit ?? 10, ((q?.page ?? 1) - 1) * (q?.limit ?? 10)]);
  return {
    data: result.rows,
    page: Number(q?.page ?? 1),
    limit: Number(q?.limit ?? 10),
  };
};

/**
 * @description get user by id
 * @param id: number
 * @returns Promise<User>
 */
const getUserById = async (id: number): Promise<User> => {
  const queryTest = `SELECT * FROM users WHERE id = $1`;
  const result = await DB.query(queryTest, [id]);
  return result.rows[0];
};

/**
 * @description delete user method
 * @param id: number
 * @returns Promise<boolean>
 */
const deleteUser = async (id: number): Promise<boolean> => {
  const deleteQuery = `DELETE FROM users WHERE id = $1`;
  const result = await DB.query(deleteQuery, [id]);
  return result.rowCount > 0;
};

/**
 * @description get user by email
 * @param email: string
 * @returns Promise<User>
 */
const getUserByEmail = async (email: string): Promise<User> => {
  const queryTest = `SELECT * FROM users WHERE email = $1`;
  const result = await DB.query(queryTest, [email]);
  return result.rows[0];
};

export { createUser, getUserByEmail, getAllUsers, getUserById, deleteUser };
