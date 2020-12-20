import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {router} from "./router";
import {seedUsers} from "./database/Users";
import {seedGroups} from "./database/Groups";
import {seedPermissions} from "./database/Permissions";
import initLogger from './Logger';

initLogger();
const seed = async () => {
    await seedPermissions();
    await seedGroups();
    await seedUsers();
};

seed().then(() => {
    const app = express();
    const port = 3100;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/", router);

    /* Handling not found url */
    app.use((req, res) => {
        res.send("Not found!");
    });

    /* Handling exceptions to always return json format */
    app.use((err, req, res, next) => {
        console.log(err);
        res.send("Exception!");
    });

    app.listen(port, () => {
        return console.log(`server is listening on ${port}`);
    });
});
