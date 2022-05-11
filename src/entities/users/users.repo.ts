import DB from '../../utils/database';
import { User } from './user.model';

const createUser = async (user: User): Promise<User> => {
    const queryTest = `INSERT INTO users (name, color, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await DB.query(queryTest, [user.name, user.color, user.email, user.password]);
    return result.rows[0];
}

const getUserByEmail = async (email: string): Promise<User> => {
    const queryTest = `SELECT * FROM users WHERE email = $1`;
    const result = await DB.query(queryTest, [email]);
    return result.rows[0];
}

export { createUser, getUserByEmail };