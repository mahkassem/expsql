import { Router } from "express";
import { authGuard } from "../utils/auth.provider";

const usersRouter = Router();

usersRouter.get("/", authGuard, (req, res) => {
    res.send("Users list");
});

usersRouter.get("/:id", authGuard, (req, res) => {
    res.send(`User ${req.params.id}`);
});

usersRouter.post("/", authGuard, (req, res) => {
    res.send("Create user");
});

export default usersRouter;