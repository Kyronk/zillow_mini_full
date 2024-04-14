import db from "../models";


// get one Current
export const getOneUserService = (id) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            raw: true,
            where: {id},
            // attributes: ['code', 'value']
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
            }
        });

        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ok" : "Failed to get provinces.",
            response
        })
    } catch (error) {
        reject(error);
    }
});

// update user
export const updateUserService = (payload ,id) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            // raw: true,
            where: {id},
            // attributes: ['code', 'value']
            // attributes: {
            //     exclude: ["password", "createdAt", "updatedAt"]
            // }
        });

        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? "Updated" : "Failed to updated user.",
            // response
        })
    } catch (error) {
        reject(error);
    }
})



