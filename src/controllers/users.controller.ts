import { getAllUsers, getUserById } from "../entities/users/users.repo";
import { Request, Response } from "express";
import { PaginatedQuery } from "../interfaces/query";

const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers(req.query as unknown as PaginatedQuery);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};


// get user by id handller
/**
 * @description Obtain specific user by ID.
 */
const getUserByIdHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserById(req.params.id as unknown as number);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error);
    }
}

export { getAllUsersHandler, getUserByIdHandler };