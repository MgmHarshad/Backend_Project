// require ('dotenv').config({path:'./env'})
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config({
    path:'./.env'
})

import express from "express";
const app = express();

connectDB();

// app.listen(process.env.PORT, ()=> {
//     console.log(`App is running on port, ${process.env.PORT}`);
// })





/*
import express from "express";
const app = express();

( async ()=> {
    try{
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // await mongoose.connect(`mongodb+srv://MgmHarshad:Harshad1868@videotube.w4l0g.mongodb.net`)
        console.log(db.connection.host)
        app.on("error", (err)=>{
            console.log("MongoDB Connection Failed:", err);
        })

        app.listen(process.env.PORT, ()=> {
            console.log(`App is running on port, ${process.env.PORT}`);
        })
    }catch (err){
        console.error("Error: ", err);
    }
})()
    */