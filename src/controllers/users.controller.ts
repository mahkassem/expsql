import { getAllUsers } from "../entities/users/users.repo";
import { Request, Response } from "express";

const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { getAllUsersHandler };