import express,{Request, Response} from  "express"
import Users  from '../models/user'
import {validateUser} from "../utills/validation"
import bcrypt from 'bcrypt'

export const getUsers = async(req:Request, res:Response)=>{
     const users = await Users.find()
     return  res.status(200).json({message:"All users fetched successfully", users})
}

export const getUser = async(req:Request, res:Response)=>{  
    const id = req.params.id 
    try {
        const user = await Users.findById(id)
        if(!user) return res.status(404).json("user not found")
        return  res.status(200).json({message:"a  user fetched successfully", user})
        
    } catch (error) {
      console.log("Error", error) 
      return res.status(500).json('the error is from us and we are on it') 
    }
}

export const createUser = async(req:Request, res:Response)=>{   
      //validating the body object
      try {
        const {name, email, password, phone} = req.body
        const {error} = validateUser(req.body)
        if(error) return res.status(400).json(error.details[0].message)
          let user = await Users.findOne({email})        
          if(user) return res.status(400).json("you're already a registered user")
          //creating new user
           user  = new Users({
           name , 
           email,
           password,
            phone
        })
        //hashing user password       
        const salt =  await  bcrypt.genSalt(10)
         user.password = await bcrypt.hash(password, salt )
         await user.save()
         return res.status(201).json({message:"user created successfully", user:{_id:user._id, name,email,phone}})       
        
      } catch (error) {
        console.log("Error", error) 
        return res.status(500).json('the error is from us and we are on it') 
      }
}


