import express from "express"

const app = express();

app.use(cors());
app.use(express.json());


import mainrouter from "../routes/userRoutes.ts"

app.use("/api/v1" , mainrouter);

app.listen(3001);