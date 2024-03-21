import * as priceService from "../services/price.service";

export const getPosts = async (req, res) => {
    try {
        const response = await priceService.getPriceService();
        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller" + error,
        })
    }
};