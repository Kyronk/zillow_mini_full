import express from "express";
import * as postController from "../controllers/post";

import verifyToke from "../middleware/verityToken";

const router = express.Router();

router.get("/all", postController.getPosts );
router.get("/limit", postController.getPostsLimit);
router.get("/new-post", postController.getNewPosts);

router.use(verifyToke);
router.post("/create-new", postController.createNewPost);
router.get("/limit-admin", postController.getPostsLimitAdmin);


export default router;

