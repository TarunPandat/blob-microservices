import HttpStatusCodes from '@src/common/constants/HttpStatusCodes'
import { Users } from '@src/models'
import { natsWrapper } from '@src/services/nats/NatsWrapper'
import UserUpdatePublisher from '@src/services/nats/Publishers/UserUpdate.publisher'
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const data = req.body
    console.log('====================================');
    console.log(data, id);
    console.log('====================================');
    const userFound = await Users.findById(id)
    if(!userFound) {
      res.status(HttpStatusCodes.NOT_FOUND).json({error: true, msg: 'User not found'})
    }
    else {
      userFound.username = data?.username
      userFound.markModified('username')
      await userFound.save()
      //@ts-ignore
      await new UserUpdatePublisher(natsWrapper.client).publish({username: userFound.username, id: userFound._id, __v: userFound.__v})
      res.status(HttpStatusCodes.OK).json({error: false, userFound})
    }
  } catch (error) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({error: true, errorData: error})
  }
}