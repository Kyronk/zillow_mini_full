import axiosConfig from "../axiosConfig";

export const apiGetPost = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: "get",
            url: "/api/v1/post/all",
            // data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});


export const apiGetPostLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: "get",
            // url: `/api/v1/post/limit?page=${page}`,
            url: `/api/v1/post/limit`,
            params: query

            // data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});

export const apiGetNewPost = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: "get",
            // url: `/api/v1/post/limit?page=${page}`,
            url: `/api/v1/post/new-post`,
            // params: query

            // data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});







