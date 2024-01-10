import mongoose from "mongoose";

const Users = mongoose.model("user", new mongoose.Schema({
   name :{
    type: String,
    minLength:5,
    maxlength:50,    
   },
   email :{
    type: String,   
    required:true,
    unique:true 
   },
   password :{
    type: String,
    minLength:5,
    maxlength:1040,    
   },
   phone :{
    type: String,  
       
   }
}))

export default Users