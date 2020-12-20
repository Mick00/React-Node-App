import {IUser} from "../data/User";

export const hasPermissionId = (id: string) => {
    return (req, res, next) => {
        const user: IUser = req.user as IUser;
        if (req.user.disabled){
            res.sendStatus(422);
        } else if (req.user.passwordNeedsReset) {
            res.sendStatus(422);
        } else if (user.hasPermission(id)) {
            next();
        } else {
            console.log("no perm")
            res.sendStatus(403);
        }
    };
};
