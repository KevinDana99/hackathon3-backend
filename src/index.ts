import express, { type Request, type Response } from "express";
import router from "./routes.js";
import cors from "cors";


console.log('Initializing server...');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(router);


app.listen(PORT);
console.log("Server listening at port ", PORT);