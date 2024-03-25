import db from "../models";


// get all province
export const getProvinceService = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Province.findAll({
            raw: true,
            attributes: ['code', 'value']
            // attributes: {
            //     exclude: ["createdAt", "updated"]
            // }
        });

        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ok" : "Failed to get provinces.",
            response
        })
    } catch (error) {
        reject(error);
    }
})


