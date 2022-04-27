import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
    res.send("Users list");
});

usersRouter.get("/:id", (req, res) => {
    res.send(`User ${req.params.id}`);
});

usersRouter.post("/", (req, res) => {
    res.send("Create user");
});

export default usersRouter;