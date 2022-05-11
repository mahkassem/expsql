import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../entities/users/users.repo";
import bcrypt from "bcrypt";
import config from "../config";
import { generateToken } from "../utils/auth.provider";

const registerHandler = async (req: Request, res: Response) => {
    try {
        let { name, color, email, password } = req.body;
        // hash password
        password = await bcrypt.hash(
            password + config.auth.bcryptPapper,
            config.auth.bcryptSalt
        );
        // create user
        const user = await createUser({ name, color, email, password });
        // remove password
        delete user.password;
        // send response
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const signinHandler = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        // get user
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(401).send("User not exists");
            return;
        }
        // check password
        const isMatch = await bcrypt.compare(
            password + config.auth.bcryptPapper,
            user.password as string
        );
        if (!isMatch) {
            res.status(401).send("Password is not correct");
            return;
        }
        // generate token
        const token = generateToken(user);
        // send response
        res.status(200).send({ token: token });
    }
    catch (error) {
        res.status(500).send(error);
    }
}

export { registerHandler, signinHandler };