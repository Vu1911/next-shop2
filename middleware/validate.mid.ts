import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";
import { object, number, string}  from 'yup'

export function validate(
    schema: OptionalObjectSchema<ObjectShape>,
    handler: NextApiHandler
) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if(['GET', 'DELETE'].includes(req.method!)){
            return await handler(req, res)
        }
        
        if(['POST', 'PUT'].includes(req.method!)){
            try {
                const newSchema = 
                    req.method === 'POST'
                    ? schema
                    : schema.concat(object({_id: string().required()}))
                
                req.body = await newSchema.validate(req.body, {stripUnknown: true});
            } catch (error) {
                console.log(error.message)
                return res.status(400).json(error)
            }

            return await handler(req, res)
        }
    }
}