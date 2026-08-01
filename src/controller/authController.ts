
import {Request,Response} from 'express'
import { IStatuscode_Json_Message } from '../interfaces/jsonmessages';
import {IUser, User} from '../models/user.model'

export const signup = async(req:Request,res:Response)=>{

    
    const {name,email,phone,password} = req.body; 

  try {
      if(!name||!email||!phone||!password)
    {
        return res.status(400).json({success:false,message:'All field are mandatory'}as IStatuscode_Json_Message)
    }

    let user :IUser | null =  await User.findOne({email}) 

    if(user)
    {
        return res.status(500).json({success:true , message:"email already exist",data:null} as IStatuscode_Json_Message);
    }


    user = await User.create({
        name,
        email,
        phone,
        password

    })

    return res.status(201).json({success:true,message:"Account created successfully",data:null} as IStatuscode_Json_Message)

    
} catch (error:any) {
    
    return res.status(404).json({success:false,message:error.message} as IStatuscode_Json_Message)
  }

}

