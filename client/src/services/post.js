import axiosConfig from "../axiosConfig";
import axios from "axios";

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
            url: `/api/v1/post/limit`,
            params: query

            // data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});

// export const apiPost = () => new Promise(async (resolve, reject) => {
//     try {
//         const response = await axiosConfig({
//             method: "get",
//             // url: `/api/v1/post/limit?page=${page}`,
//             url: `/api/v1/post/new-post`,
//             // params: query

//             // data: payload
//         });
//         resolve(response);
//     } catch (error) {
//         reject(error)
//     }
// });

export const apiGetNewPost = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: "post",
            url: `/api/v1/post/new-post`,

        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});


export const apiUploadImage = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: "post",
            url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUND_NAME}/image/upload/`,
            data: images,

        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});







