import express from "express";
import userRoutes from "./userRoutes.ts"
const router = express.Router();

router.use('/use' , userRoutes )

export default router;  