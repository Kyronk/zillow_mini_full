import express from "express";
import * as controller from "../controllers/area";


const router = express.Router();

router.get("/all", controller.getArea );
// router.post("/login", authController.login);



export default router;

