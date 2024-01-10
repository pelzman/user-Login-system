import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
interface User{
    name:string
    email:string
    password:string
    phone:string
}
const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,   
  };

export function validateUser(user:User){
   const validated = Joi.object({
      name: Joi.string().min(5).max(50),
      email: Joi.string().required().email().description('email is required'),
      password : passwordComplexity(complexityOptions).description("require atleast min 5 characters, a lowercase,an uppercase, a number and a symbol"),
      phone: Joi.string().max(50),
   })
   return   validated.validate(user)
}

export function validateUserAuth(user:User){   
    const validated = Joi.object({      
      email: Joi.string().required().email().description('email is required'),
      password : passwordComplexity(complexityOptions).description("require atleast min 5 characters, a lowercase,an uppercase, a number and a symbol"),
    
   })
   return   validated.validate(user)
}

