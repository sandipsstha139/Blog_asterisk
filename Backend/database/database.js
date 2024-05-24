import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("internship", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

export const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected ...");
    await sequelize.sync();
    console.log("Database Synced");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};
