import HttpStatusCodes from '@src/common/constants/HttpStatusCodes'
import { Users } from '@src/models'
import {Request, Response} from 'express'

export const createUser = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body
    
    if(!email || !password) {
         res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            msg: 'Email and password is required'
        })
    }

    const userExist = await Users.findOne({email})

    if(userExist){
         res.status(HttpStatusCodes.CONFLICT).json({
            error: true,
            msg: 'User already exist'
        })
    }

    const user = await Users.create({email, password})

    if(user)
    {
      res.status(HttpStatusCodes.CREATED).json({
        error: false,
        data: user
      })
    }
    else {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: true,
        msg: 'Something went wrong'
      })
    }
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: true,
      errorData: error
    })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body
    
    if(!email || !password) {
         return res.status(HttpStatusCodes.BAD_REQUEST).json({
            error: true,
            msg: 'Email and password is required'
        })
    }

    const user = await Users.findOne({email})

    if(user){
         return res.status(HttpStatusCodes.OK).json({
            error: false,
            user: user
        })
    }
    else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: true,
        msg: 'User do not exist'
      })
    }


      
  } catch (error) {
     res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: true,
      errorData: error
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {

  try {
    const {id} = req.params
    const user = await Users.findById(id)
    if(user) {
      return res.status(HttpStatusCodes.OK).json({
            error: false,
            user: user
        })
    }
    else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: true,
        msg: 'User do not exist'
      })
    }
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      error: true,
      errorData: error
    })
  }
}