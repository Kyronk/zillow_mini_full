import express from "express";
import verifyToken from "../middleware/verityToken";
import * as userController from "../controllers/user";


const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
router.put("/update", userController.updateCurrent);



export default router;

