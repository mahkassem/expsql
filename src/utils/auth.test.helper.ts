import config from "../config";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../entities/users/users.repo";
import { generateToken } from "./auth.provider";
import { User } from "../entities/users/user.model";

export interface TestUser {
    token: string
    user: User
}

export const createTestUser = async (): Promise<TestUser> => {
    const user = {
        name: 'test',
        color: 'red',
        email: 'auth@test.com',
        password: 'secret'
    }

    // hash password
    user.password = await bcrypt.hash(user.password + config.auth.bcryptPapper, config.auth.bcryptSalt);

    // check if user exists
    let authUser = await getUserByEmail(user.email);
    if (!authUser) {
        // create user
        authUser = await createUser(user);
    }

    // generate token
    const token = generateToken(user);

    return {
        token,
        user: authUser
    }
}