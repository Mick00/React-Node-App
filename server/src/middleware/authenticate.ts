import {verifyJWT} from "../jwt";
import {getUser} from "../database/Users";

export const authenticateWithJWT = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        const user = await verifyJWT(token) as {username: string};
        req.user = getUser(user.username);
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};
