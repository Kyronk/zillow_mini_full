import db from "../models";
// import { Op } from "sequelize";
const { Op } = require("sequelize");

// get all Post
export const getPostService = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: "images", attributes: ["image"]},
                { model: db.Attribute, as: "attributes", attributes: ["price", "acreage", "published", "hashtag"]},
                { model: db.User, as: "user", attributes: ["name", "zalo", "phone"]},

            ],
            attributes: ["id", "title", "star", "address", "description"]
            // attributes: ['code', 'value']
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


// get Post limit
export const getPostLimitService = (page, query, { priceNumber, areaNumber }) => new Promise( async (resolve, reject) => {
    // console.log({ priceNumber, areaNumber });
    try {
        let offset = ( !page || +page <= 1 ) ? 0 : (+page + 1);
        const queries = { ...query};
        if ( priceNumber ) queries.priceNumber = { [Op.between]: priceNumber}
        if ( areaNumber ) queries.areaNumber = { [Op.between]: areaNumber}
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            // offset: page * (+process.env.LIMIT) || 0,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: "images", attributes: ["image"]},
                { model: db.Attribute, as: "attributes", attributes: ["price", "acreage", "published", "hashtag"]},
                { model: db.User, as: "user", attributes: ["name", "zalo", "phone"]},

            ],
            attributes: ["id", "title", "star", "address", "description"]
            // attributes: ['code', 'value']
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
});


// Get new Post
export const getNewPostService = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            // offset: page * (+process.env.LIMIT) || 0,
            offset: 0,
            order: [["createdAt", "DESC"]],
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: "images", attributes: ["image"]},
                { model: db.Attribute, as: "attributes", attributes: ["price", "acreage", "published", "hashtag"]},
                // { model: db.User, as: "user", attributes: ["name", "zalo", "phone"]},

            ],
            attributes: ["id", "title", "star", "createdAt"]
            // attributes: ['code', 'value']
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
});