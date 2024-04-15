import * as userService from "../services/user.service";

export const getCurrent = async (req, res) => {
    
    const { id } = req.user; 
    try {

        const response = await userService.getOneUserService(id);
        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at user get by id controller" + error,
        })
    }
};


export const updateCurrent = async (req, res) => {
    
    const { id } = req.user;
    const  payload  = req.body; 
    try {
        if (!payload) return res.status(400).json({
            err: 1,
            msg: "Thiêut payload"
        });
        const response = await userService.updateUserService( payload,id);
        return res.status(200).json(response);


    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at user update controller" + error,
        })
    }
};
