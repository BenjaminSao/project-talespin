import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../datasource.js";

export const Image = sequelize.define("image", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
});
