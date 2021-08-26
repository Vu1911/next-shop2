import { object, string, date, number, array } from "yup";
import { ProductStatus, TransType } from "../interfaces/product.interface";


export const productYupSchema = object({
    imgUrl: string().required(),
    title: string().required(),
    quantity: number().required().min(1),
    price: number().required(),
    description: string().required(),
    status: string().oneOf([ProductStatus.OPEN, ProductStatus.CLOSE]),
    transaction: array().of(object().shape({
        transType: string().oneOf([TransType.BUY, TransType.SELL]),
        volume: number(),
        quantity: number(),
        time: date()
    }))
})