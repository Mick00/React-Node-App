"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermissionId = (id) => {
    return (req, res, next) => {
        const user = req.user;
        if (req.user.disabled) {
            res.sendStatus(422);
        }
        else if (req.user.passwordNeedsReset) {
            res.sendStatus(422);
        }
        else if (user.hasPermission(id)) {
            next();
        }
        else {
            console.log("no perm");
            res.sendStatus(403);
        }
    };
};
//# sourceMappingURL=hasPermission.js.map