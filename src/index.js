// require ('dotenv').config({path:'./env'})
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config({
    path:'./.env'
})

import express from "express";
const app = express();

app.get('/', (req, res)=> {
    res.send('server is ready');
})

connectDB()
.then(()=> {
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
        
    })
})
.catch((err) =>{
    console.log("MongoDB Connection Failed", err);
    
})

// app.listen(process.env.PORT, ()=> {
//     console.log(`App is running on port, ${process.env.PORT}`);
// })





/*
import express from "express";
const app = express();

( async ()=> {
    try{
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
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