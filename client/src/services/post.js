// import axios from "axios";

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


export const apiGetPostLimit = (page) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: "get",
            url: `/api/v1/post/limit?page=${page}`,
            // data: payload
        });
        resolve(response);
    } catch (error) {
        reject(error)
    }
});







