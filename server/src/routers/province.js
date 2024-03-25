import express from "express";
import * as provinceController from "../controllers/province";


const router = express.Router();

router.get("/all", provinceController.getArea);
// router.post("/login", authController.login);



export default router;

