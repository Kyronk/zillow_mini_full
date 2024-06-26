// const express = require('express');
import express from "express";
require("dotenv").config();
// import dotenv from "dotenv";
// dotenv.config();
// const cors = require("cors");
import cors from "cors";
// const dbconn = require("./src/config/connectDatabase");

import dbconn from "./src/config/connectDatabase";
import initRoutes from "./src/routers";

// import generateDate from "./src/ultis/generateDate";

// import generateCode from "./src/ultis/generateCode";
// console.log(generateCode(6))

const app =  express();

// console.log(generateDate());

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", 'GET', 'PUT', "DELETE"]
}))
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

initRoutes(app)

const PORT = process.env.PORT || 4567;
dbconn();


const listener = app.listen(PORT , () => {
    console.log("Server is start on post = ", listener.address().port);
});