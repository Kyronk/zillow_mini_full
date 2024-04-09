import db from "../models";
// import { Op } from "sequelize";
const { Op } = require("sequelize");
import { v4 as generateId } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";

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
            order: [["createdAt", "DESC"]],
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



// create new post
export const createNewPostService = (body, userId) => new Promise( async (resolve, reject) => {
    // console.log(body.province);
    // const provinceCode = body.province.include("Thành phố") ? 
    //     generateCode(body?.province?.replace("Thành phố ", "")) : 
    //     generateCode(body?.province?.replace("Tỉnh ", ""));
    
    // const province = body.province;

    // const provinceT = province.includes("Thành phố");

    // console.log(provinceT)

    try {
        const attributesId = generateId();
        const imagesId = generateId();
        const overviewId = generateId();
        const labelCode = generateCode(body.label);
        const hashtag = Math.floor(Math.random() * Math.pow(10,6));

        const currentDate = new Date();


        const response = await db.Post.create({
            id: generateId(),
            title: body.title,
            labelCode,
            address: body.address || null,
            attributesId,
            categoryCode: body.categoryCode,
            description: body.description || null,
            description: JSON.stringify(body.description) || null,
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body.provinceCode ||null,

            priceNumber: body.priceNumber,

            areaNumber: body.areaNumber,
        });

        await db.Attribute.create({
            id: attributesId,
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000}` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2`,
            // published: moment(new Data).format("DD/MM/YYYY"),
            hashtag: `#${hashtag}`
        });

        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body.images)
        });
        await db.Overview.create({
            id: overviewId,
            code: `#${hashtag}`,
            area: body.label ,
            type: body?.category,
            target: body?.target,
            bonus: "Tin thường",
            created: currentDate,
            expired: currentDate.setDate(currentDate.getDate() + 10),
        });

        await db.Province.findOrCreate({
            where:{
                [Op.or]: [
                    {value: body?.province?.replace("Thành phố ", "")},
                    {value: body?.province?.replace("Tỉnh ", "")}
                ]
            },
            defaults: {
                code: body.province.includes("Thành phố") ? 
                    generateCode(body?.province?.replace("Thành phố ", "")): 
                    generateCode(body?.province?.replace("Tỉnh ", "")),
                
                    value: body.province.includes("Thành phố") ? 
                        body?.province?.replace("Thành phố ", "") :
                        body?.province?.replace("Tỉnh ", "")
                
                
                // code: "test",
                // value: "test"
            }
        });

        await db.Label.findOrCreate({
            // where: { value: body?.province?.replace("Thành phố")}
            where:{
                code: labelCode
            },
            defaults: {
                code: labelCode,
                value: body.label
            }
        })





        // const response = await db.Post.create({
        //     ...body, // không nên truyển cả cái body như vậy
        //     userId
        // });

        resolve({
            // err: response ? 0 : 1,
            // msg: response ? "Ok" : "Failed to get categories.",
            // response
            err: 0,
            msg: "Ok"
        })
    } catch (error) {
        reject(error);
    }
});
