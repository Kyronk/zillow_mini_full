import db from "../models";


// get all Area
export const getAreaService = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Area.findAll({
            raw: true,
            attributes: ['code', 'value', 'order']
            // attributes: {
            //     exclude: ["createdAt", "updated"]
            // }
        });

        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ok" : "Failed to get areas.",
            response
        })
    } catch (error) {
        reject(error);
    }
})


