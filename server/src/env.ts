import dotenv from "dotenv";

interface IEnv {
    DB_HOST: string;
    DB_PASS: string;
    DB_USER: string;
    DB_NAME: string;
    TOKEN_KEY: string;
}

export const env: IEnv = dotenv.config().parsed as unknown as IEnv;
