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
