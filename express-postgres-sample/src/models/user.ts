import { DataTypes } from "sequelize"
import { sequelize } from "../db"

export const userModel = sequelize.define('User', {
    googleId: {
        type: DataTypes.STRING
    },
    googleData: {
        type: DataTypes.JSON
    }
})

userModel.sync()