import { DataTypes } from "sequelize";
import { sequelize } from "../datasource.js";

export const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
