import mongoose from "mongoose";

export const createConnection = async () => {
    // const mongoose = require("mongoose");
    // mongoose.connect(process.env.MONGO_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // });
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected: "+conn.connection.host)
    }catch(error){
        console.log(`Error connecting to database: ${error.message}`)
        // process code 1 - error 
        process.exit(1)
    }
}