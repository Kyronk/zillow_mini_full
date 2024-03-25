import * as provinceService from "../services/province.service";

export const getArea = async (req, res) => {
    try {
        const response = await provinceService.getProvinceService();
        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller" + error,
        })
    }
};