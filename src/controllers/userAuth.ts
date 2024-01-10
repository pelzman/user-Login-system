import Users from "../models/user"
import express,{Request, Response} from 'express'
import { validateUserAuth } from "../utills/validation"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
  import dotenv from "dotenv"
  dotenv.config()

export const userAuth = async(req:Request, res:Response)=>{   
   
    try {
      const { email, password} = req.body
       //validating the body object
      const {error} = validateUserAuth(req.body)     
      if(error) return res.status(400).json(error.details[0].message)
       //check if email match
        let user = await Users.findOne({email})        
        if(!user) return res.status(400).json("Invalid email or password") 
        //validating password             
        const validPassword = await bcrypt.compare(password, user.password!)
       if(!validPassword) res.status(400).json("Invalid email or password")              
    //    generating token with jwt
       const secret = process.env.APP_SECRET
     const token = jwt.sign({_id : user._id}, `${secret}` )
     return res.status(200).json({user, token} )         
      
    } catch (error) {
      console.log("Error", error) 
      return res.status(500).json('the error is from us and we are on it') 
    }
}