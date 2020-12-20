import {Router} from "express";
import {hasPermissionId} from "../../middleware/hasPermission";
import {authenticateWithJWT} from "../../middleware/authenticate";
import {CUSTOMER_COMMERCIAL_READ, CUSTOMER_RESIDENTIAL_READ} from "../../database/Permissions";

export const router = Router();

router.get("/residential", authenticateWithJWT,  hasPermissionId(CUSTOMER_RESIDENTIAL_READ), (req, res, next) => {
    res.send([
        {
            name: "Steeve Jean Jacques",
            address: "123 rue de la colline",
            phone: "(418) 123-3210",
        },
        {
            name: "Patricia Tremblay",
            address: "763 blv du Saguenay",
            phone: "(418) 543-0580",
        },
    ]);
});

router.get("/commercial", authenticateWithJWT,  hasPermissionId(CUSTOMER_COMMERCIAL_READ), (req, res, next) => {
    res.send([
        {
            name: "Karl avec un K",
            address: "888 rue des usines",
            business: "Karl Konstruit",
            phone: "(418) 123-3210",
        },
        {
            name: "Janie Thibeault",
            address: "763 blv du Saguenay",
            business: "Pharmarcie",
            phone: "(418) 543-0580",
        },
    ]);
});
