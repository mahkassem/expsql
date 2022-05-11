import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "../entities/users/users.repo";
import { IsEmail, IsNotNullOrEmpty } from "./common.validations";

const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { name, color, email, password } = req.body;
    const errorBag = [];

    if(IsNotNullOrEmpty(name)) errorBag.push("name is required");
    if(IsNotNullOrEmpty(color)) errorBag.push("color is required");
    if(IsNotNullOrEmpty(email)) errorBag.push("email is required");
    if(!IsEmail(email)) errorBag.push("email is invalid");
    const userExists = await getUserByEmail(email);
    if(userExists) errorBag.push("email is already in use");
    if(IsNotNullOrEmpty(password)) errorBag.push("password is required");

    if(errorBag.length > 0) {
        res.status(400).send(errorBag);
        return;
    }

    next();
}

export { registerValidation };