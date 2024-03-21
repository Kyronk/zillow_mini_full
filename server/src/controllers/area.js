import * as areaService from "../services/area.service";

export const getArea = async (req, res) => {
    try {
        const response = await areaService.getAreaService();
        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller" + error,
        })
    }
};