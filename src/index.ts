import express, { type Request, type Response } from "express";
import router from "./routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);


app.listen(PORT);