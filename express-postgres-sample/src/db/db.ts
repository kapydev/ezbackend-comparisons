import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE!,
    process.env.POSTGRES_USER!,
    process.env.POSTGRES_PASSWORD!,
    {
        dialect: "postgres",
        host: process.env.POSTGRES_HOST!,
        port: Number(process.env.POSTGRES_PORT!),
        logging: false
    })