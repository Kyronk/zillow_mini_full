import db from "../models";

const { Op } = require("sequelize");
import { v4 as generateId } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateDate";

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


// // get Post limit
export const getPostLimitService = (
    page,
    { limitPost, order,...query}, 
    { priceNumber, areaNumber }
) => new Promise( async (resolve, reject) => {
    // console.log({ priceNumber, areaNumber });
    try {
        let offset = ( !page || +page <= 1 ) ? 0 : (+page - 1);
        const queries = { ...query};
        const limit = +limitPost || +process.env.LIMIT;
        queries.limit = limit;
        if ( priceNumber ) query.priceNumber = { [Op.between]: priceNumber}
        if ( areaNumber ) query.areaNumber = { [Op.between]: areaNumber}
        if ( order ) queries.order = [order]
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            // offset: page * (+process.env.LIMIT) || 0,
            offset: offset * limit,
            ...queries,
            // limit: +process.env.LIMIT,
            // order: [["createdAt", "DESC"]],
            include: [
                { model: db.Image, as: "images", attributes: ["image"]},
                { model: db.Attribute, as: "attributes", attributes: ["price", "acreage", "published", "hashtag"]},
                { model: db.User, as: "user", attributes: ["name", "zalo", "phone"]},
                { model: db.Overview, as: "overviews"},

            ],
            attributes: ["id", "title", "star", "address", "description"]
        });

        // const response = await db.Post.findAndCountAll({
        //     where: query,
        //     raw: true,
        //     nest: true,
        //     offset: page * (+process.env.LIMIT) || 0,
        //     // offset: offset * limit,
        //     ...queries,
        //     limit: +process.env.LIMIT,
        //     order: [["createdAt", "DESC"]],
        //     include: [
        //         { model: db.Image, as: "images", attributes: ["image"]},
        //         { model: db.Attribute, as: "attributes", attributes: ["price", "acreage", "published", "hashtag"]},
        //         { model: db.User, as: "user", attributes: ["name", "zalo", "phone"]},

        //     ],
        //     attributes: ["id", "title", "star", "address", "description"]

        // });

        resolve({
            err: response ? 0 : 1,
            msg: response ? "Ok" : "Failed to get categories.",
            response
        })
    } catch (error) {
        reject(error);
    }
});


// git limit old
// export const getPostLimitService = (page, query, { priceNumber, areaNumber }) => new Promise( async (resolve, reject) => {
//     // console.log({ priceNumber, areaNumber });
//     try {
//         let offset = ( !page || +page <= 1 ) ? 0 : (+page - 1);
//         const queries = { ...query};
//         if ( priceNumber ) queries.priceNumber = { [Op.between]: priceNumber}
//         if ( areaNumber ) queries.areaNumber = { [Op.between]: areaNumber}
//         const response = await db.Post.findAndCountAll({
//             where: queries,
//             raw: true,
//             nest: true,
//             // offset: page * (+process.env.LIMIT) || 0,
//             offset: offset * +process.env.LIMIT,
//             limit: +process.env.LIMIT,
//             order: [["createdAt", "DESC"]],
//             include: [
//                 { model: db.Image, as: "images", attributes: ["image"]},
//                 { model: db.Attribute, as: "attributes", attributes: ["price", "acreage", "published", "hashtag"]},
//                 { model: db.User, as: "user", attributes: ["name", "zalo", "phone"]},

//             ],
//             attributes: ["id", "title", "star", "address", "description"]
//             // attributes: ['code', 'value']
//             // attributes: {
//             //     exclude: ["createdAt", "updated"]
//             // }
//         });

//         resolve({
//             err: response ? 0 : 1,
//             msg: response ? "Ok" : "Failed to get categories.",
//             response
//         })
//     } catch (error) {
//         reject(error);
//     }
// });


// get post by user Id
export const getPostLimitAdminService = (page, query, id) => new Promise( async (resolve, reject) => {
    // console.log({ priceNumber, areaNumber });
    // console.log(id)
    try {
        let offset = ( !page || +page <= 1 ) ? 0 : (+page - 1);
        const queries = { ...query, userId: id};
        // if ( priceNumber ) queries.priceNumber = { [Op.between]: priceNumber}
        // if ( areaNumber ) queries.areaNumber = { [Op.between]: areaNumber}
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            // offset: page * (+process.env.LIMIT) || 0,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            order: ["createdAt", "DESC"],
            include: [
                { model: db.Image, as: "images", attributes: ["image"]},
                { model: db.Attribute, as: "attributes", attributes: ["price", "acreage", "published", "hashtag"]},
                { model: db.User, as: "user", attributes: ["name", "zalo", "phone"]},
                { model: db.Overview, as: "overviews"},
                // { model: db.Overview.}


            ],
            // attributes: ["id", "title", "star", "address", "description"]
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

//
export const updatePostService = ({ postId, overviewId, imagesId, attributesId, ...body }) => new Promise( async (resolve, reject) => {
    try {
        // let offset = ( !page || +page <= 1 ) ? 0 : (+page - 1);
        // const queries = { ...query, userId: id};
        const labelCode = generateCode(body.label);

        const response = await db.Post.update({
            // id: generateId(),
            title: body.title,
            labelCode,
            address: body.address || null,
            // attributesId,
            categoryCode: body.categoryCode,
            description: body.description || null,
            description: JSON.stringify(body.description) || null,
            areaCode: body.areaCode || null,
            priceCode: body.priceCode || null,
            provinceCode: body.provinceCode ||null,

            priceNumber: body.priceNumber,

            areaNumber: body.areaNumber,
        }, {
            where: { id: postId}
        });

        await db.Attribute.update({
            // id: attributesId,
            price: +body.priceNumber < 1 ? `${+body.priceNumber * 1000000} đồng/tháng` : `${body.priceNumber} triệu/tháng`,
            acreage: `${body.areaNumber} m2`,
            // published: moment(new Data).format("DD/MM/YYYY"),
            // hashtag: `#${hashtag}`
        }, {
            where: {id: attributesId}
        });

        await db.Image.update({
            // id: imagesId,
            image: JSON.stringify(body.images)
        }, {
            where: {id: imagesId}
        });

        await db.Overview.update({
            // id: overviewId,
            // code: `#${hashtag}`,
            area: body.label ,
            type: body?.category,
            target: body?.target,
            // bonus: "Tin thường",
            // created: currentDate.today,
            // expired: currentDate.expireDay,
        }, {
            where: {id: overviewId}
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


        resolve({
            err:  0 ,
            msg:  "Updated",
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
            msg: response ? "Ok" : "Failed to get new post.",
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

        // const currentDate = new Date();
        const currentDate = generateDate();


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
            created: currentDate.today,
            expired: currentDate.expireDay,
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


// delete post
export const deletePost = (postId) => new Promise( async (resolve, reject) => {
    try {


        const response = await db.Post.destroy({
            where: { id: postId}
        });


        resolve({
            err: response > 0 ? 0 : 1,
            msg: response > 0 ? "Delete" : "No post delete"
        })
    } catch (error) {
        reject(error);
    }
});
