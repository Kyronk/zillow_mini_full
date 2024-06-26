import axiosConfig from "../axiosConfig";

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: "get",
            url: "/api/v1/user/get-current",
            // data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});


export const apiUpdateUser = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: "put",
            url: "/api/v1/user/update",
            data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});



// export const apiGetPost12 = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await axiosConfig({
//             method: "get",
//             url: "/api/v1/post/all",
//             // data: payload
//         });
//         resolve(response);
//     } catch (error) {
//         reject(error)
//     }
// });