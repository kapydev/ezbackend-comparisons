import { DataTypes } from "sequelize"
import { sequelize } from "../db"

export const postModel = sequelize.define('Post', {
    summary: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
})

postModel.sync()