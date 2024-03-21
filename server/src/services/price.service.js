import db from "../models";


// get all Category
export const getPriceService = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Price.findAll({
            raw: true,
            attributes: ['code', 'value', 'order']
            // attributes: {
            //     exclude: ["createdAt", "updated"]
            // }
        });

        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ok" : "Failed to get categories.",
            response
        })
    } catch (error) {
        reject(error);
    }
})


