import express from "express"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());


import mainrouter from "../routes/index";

app.use("/api/v1" , mainrouter);

app.listen(3001);