import axios from "axios";
import { IAccount } from "../interfaces/account.interface";
import { IProduct } from "../interfaces/product.interface";

export async function createProduct(product: IProduct) {
    try {
        const response = await axios.post('/api/product', product)
        return response.data
    } catch (error) {
        return {error: `Fail to create user! ${error.message}`}
    }
} 

export const getAllProducts = async (url: string = "/api/product") => {
        const res = await axios.get(url)
        if (res.status != 200) {
            const error = new Error('An error occurred while fetching the data.')
            error.message = await res.data
            throw error
        }

        res.data.forEach((data: any) => data["key"] = data._id)
       return await res.data
}

export async function getProduct(id: any) {
    try {
        console.log(id)

        const response = await axios.get(`/api/product?id=${id}`)
        console.log(response.data)
        
        return response.data
    } catch (error) {
        return false
    }
}

export async function editProduct(product: any){
    try {
        console.log(product)
        const response = await axios.put('/api/product', product)
        return response.data
    } catch (error) {
        return {error: `Fail to edit product! ${error.message}`}
    }
}

export async function deleteProduct(id: any) {
    const res = await axios.delete(`/api/product?id=${id}`)
        if (res.status != 200) {
            const error = new Error('An error occurred while fetching the data.')
            error.message = await res.data
            throw error
        }
        return res
}

