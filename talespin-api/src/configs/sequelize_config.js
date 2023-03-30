import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres",
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

export async function sequelizeSetup() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: { drop: false } });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
