import DB from '../../utils/database';
import { User } from './user.model';

/**
 * @description create user
 * @param user: User
 * @returns Promise<User>
 */
const createUser = async (user: User): Promise<User> => {
    const queryTest = `INSERT INTO users (name, color, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await DB.query(queryTest, [user.name, user.color, user.email, user.password]);
    return result.rows[0];
}

/**
 * @description get all users
 * @returns Promise<User[]>
 */
const getAllUsers = async (): Promise<User[]> => {
    const queryTest = `SELECT * FROM users`;
    const result = await DB.query(queryTest);
    return result.rows;
}

/**
 * @description get user by id
 * @param id: number
 * @returns Promise<User>
 */
const getUserById = async (id: number): Promise<User> => {
    const queryTest = `SELECT * FROM users WHERE id = $1`;
    const result = await DB.query(queryTest, [id]);
    return result.rows[0];
}

/**
 * @description update user method
 * @param id: number 
 * @returns Promise<User>
 */

/**
 * @description delete user method
 * @param id: number
 * @returns Promise<boolean>
 */

/**
 * @description get user by email
 * @param email: string
 * @returns Promise<User>
 */
const getUserByEmail = async (email: string): Promise<User> => {
    const queryTest = `SELECT * FROM users WHERE email = $1`;
    const result = await DB.query(queryTest, [email]);
    return result.rows[0];
}

export { createUser, getUserByEmail, getAllUsers, getUserById };