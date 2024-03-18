import express from "express";
import * as insertController from "../controllers/insert";


const router = express.Router();

router.post("/", insertController.insert );
// router.post("/login", authController.login);



export default router;

