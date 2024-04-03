import axios from  "../axiosConfig";
import axiosDefault from "axios";

export const apiGetPrices = () => new Promise (async (resolve, reject) => {
    try {
        const response = await axios({
            method: "get",
            url: "/api/v1/price/all"
        });

        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetArea = () => new Promise (async (resolve, reject) => {
    try {
        const response = await axios({
            method: "get",
            url: "/api/v1/area/all"
        });

        resolve(response);
    } catch (error) {
        reject(error);
    }
});


export const apiGetProvince = () => new Promise (async (resolve, reject) => {
    try {
        const response = await axios({
            method: "get",
            url: "/api/v1/province/all"
        });

        resolve(response);
    } catch (error) {
        reject(error);
    }
});