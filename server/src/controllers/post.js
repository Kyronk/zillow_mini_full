import * as postService from "../services/post.service";

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostService();
        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller" + error,
        })
    }
};


export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query;
    try {
        // if (!offset)
        const response = await postService.getPostLimitService(page, query, { priceNumber, areaNumber });
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller" + error,
        })
    }
};


export const getNewPosts = async (req, res) => {
    // const { page, ...query } = req.query;
    try {
        // if (!offset)
        const response = await postService.getNewPostService();
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller" + error,
        })
    }
};


