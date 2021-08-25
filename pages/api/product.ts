import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Role } from "../../interfaces/account.interface";
import { IProduct } from "../../interfaces/product.interface";
import connectDB from "../../middleware/connectDB.mid";
import checkRole from "../../middleware/guard.mid";
import { validate } from "../../middleware/validate.mid";
import Product from "../../models/product.model";
import { productYupSchema } from "../../yupSchema/productYupSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
 
    if(req.method === 'GET') {
        try {
            if(req.query.id) {
                const product: IProduct | null = await Product.findOne({_id: Types.ObjectId(`${req.query.id}`)}).exec()
                return res.status(200).json(product)
            }

            const products: IProduct[] = await Product.find().exec()
            return res.status(200).json(products)
        } catch (error) {
            return res.status(400).json({error: `Get all products failed: ${error.message}`})
        }
    }
    
    if(req.method === 'POST'){
        try {
            let request = req.body

            let product = new Product(request)
            let createdProduct = await product.save()
            return res.status(201).json(createdProduct)


        } catch (error) {
            console.log(error)
            return res.status(401).json({error: `Create product failed: ${error.message}`})
        }
    }

    if(req.method === 'PUT'){
        try {
            let request = req.body
            console.log(request)

            let updatedResult = await Product.updateOne({_id: Types.ObjectId(request._id)}, request)
            let updatedProduct = await Product.findOne({_id: Types.ObjectId(`${request._id}`)}).exec()
            return res.status(200).json(updatedProduct)


        } catch (error) {
            console.log(error)
            return res.status(401).json({error: `Update product failed: ${error.message}`})
        }
    }
    
    if(req.method === 'DELETE') {
        try {
            if(req.query.id) {
                const response = await Product.remove({_id: `${req.query.id}`}).exec()
                console.log(response)
                return res.status(200).json({message: "Delete successfully!"})
            } else {
                return res.status(400).json({message: "data not found!"})
            }

        } catch (error) {
            return res.status(400).json({error: `Get all users failed: ${error.message}`})
        }
    }
}

export default connectDB(validate(productYupSchema, checkRole(Role.USER, handler)))
