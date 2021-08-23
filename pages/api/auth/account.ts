import { NextApiRequest, NextApiResponse } from "next";
import { IAccount, Role } from "../../../interfaces/account.interface";
import { hashPassword } from "../../../middleware/bcrypt.mid";
import connectDB from "../../../middleware/connectDB.mid";
import checkRole from "../../../middleware/guard.mid";
import { validate } from "../../../middleware/validate.mid";
import User from "../../../models/account.model";
import { accountYupSchema } from "../../../yupSchema/account.yup";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {
        try {
            const users: IAccount[] = await User.find().exec()
            return res.status(200).json(users)
        } catch (error) {
            return res.status(400).json({error: `Get all users failed: ${error.message}`})
        }
    }
    
    if(req.method === 'POST'){
        try {
            let request = req.body
        
            request.password = await hashPassword(request.password)

            let user = new User(request)
            let createdUser = await user.save()
            return res.status(201).json(createdUser)


        } catch (error) {
            console.log(error)
            return res.status(401).json({error: `Create user failed: ${error.message}`})
        }
    }
    
    
}

export default connectDB(validate(accountYupSchema, checkRole(Role.ADMIN, handler)))
