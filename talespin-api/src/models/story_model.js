import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../datasource.js";

export const Story = sequelize.define("story", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colorScheme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  storyLength: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  artStyle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storyContent: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
