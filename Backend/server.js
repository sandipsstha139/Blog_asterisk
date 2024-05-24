import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import {connectToDb} from "./database/database.js";

console.log(process.env.NODE_ENV);
const port = process.env.PORT;

connectToDb();


app.listen(port, () => {
  console.log(`Server is Listening on ${port}...`);
});
