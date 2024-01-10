import mongoose, { mongo } from "mongoose";

export const db = mongoose.connect("mongodb://127.0.0.1:27017/login-system")
            .then(()=>console.log("mongo database is running...")) 
            .catch(error =>console.log("Error", error)) 


      