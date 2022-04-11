const express = require('express');
const app = express();

//routing endpont file
const router = require("./src/Routes/api")

const bodyParser = require('body-parser');
//security middleware import
const rateLimit = require('express-rate-limit')
const helemt = require('helmet');
const xssClean =require('xss-clean');
const  mongoSanitize=require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');

//security middleware implementation for
app.use(helemt());
app.use(xssClean());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());
app.use(bodyParser());

//rate limit settings
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);

//mongodb configeration and connection
const uri ='mongodb://127.0.0.1:27017/colleges';
options={user:"", pass:""};
mongoose.connect(uri, options, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("database connection successfully")
    }
})
app.use("/api/v2", router);
//undefined route
app.use("*", (req, res)=>{
    res.status(404).json({status: "fail", data:"api not found"});
})

module.exports = app;