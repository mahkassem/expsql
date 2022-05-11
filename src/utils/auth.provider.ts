import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import config from '../config';
import { getUserByEmail } from "../entities/users/users.repo";

const generateToken = (user: any) => {
    try {
        const payload = {
            sub: user.email,
            name: user.name,
            isAdmin: true
        };

        const options = {
            expiresIn: config.auth.jwtExpiration
        };

        return jwt.sign(payload, config.auth.jwtSecret, options);

    } catch (error) {
        throw new Error(error as string);
    }
}

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Bearer token
        if (!token) {
            res.status(401).send('Token not provided');
            return;
        }
        // verify token
        const payload = jwt.verify(token, config.auth.jwtSecret);

        // check if user exists
        const user = await getUserByEmail(payload.sub as string);
        if (!user) {
            res.status(401).send('User is no longer exists');
            return;
        }

        // add user to request
        res.locals.user = user;

        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

export { generateToken, authGuard };