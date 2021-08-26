import axios from "axios";
import { IAccount } from "../interfaces/account.interface";
import { IProduct, TransType } from "../interfaces/product.interface";

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

export async function addTransaction(trans: any, product: any){
    let transaction = {transType: trans.transType, volume: 0, time: trans.time, quantity: 0}
    transaction.volume = (transaction.transType == TransType.BUY)? parseInt(trans.volume) : -parseInt(trans.volume)
    
    const updatedTransaction = JSON.parse(JSON.stringify(product))
    // console.log(transaction)
    // console.log(product)
    // console.log(updatedTransaction)
    // console.log(product === updatedTransaction)

    if(product.transaction.length == 0 || product.transaction[product.transaction.length-1].time < transaction.time){
        transaction["quantity"] = product.quantity + transaction.volume



        if(transaction["quantity"] < 0){
            return {error: "transaction negative!"}
        }

        updatedTransaction.transaction.push({...transaction})
        updatedTransaction.quantity = transaction.quantity
        
    } else {
        let insertIndex = -1
        for(let i = 0; i < product.transaction.length; i ++){
            if (insertIndex == -1 && product.transaction[i].time > transaction.time){
                insertIndex = i
                transaction["quantity"] = (insertIndex != 0) ? product.transaction[i-1].quantity + transaction.volume : transaction.volume + product.transaction[i].quantity - product.transaction[i].volume
                
                if(transaction["quantity"] < 0){
                    return {error: "transaction negative!"}
                }

                updatedTransaction.transaction[i].quantity += transaction.volume
            } else if (insertIndex != -1){
                updatedTransaction.transaction[i].quantity += transaction.volume
            }
            if (updatedTransaction.transaction[i].quantity < 0){
                return {error: "transaction negative!"}
            }
        }

        console.log(insertIndex)
        console.log(updatedTransaction.transaction)

        updatedTransaction.transaction.splice(insertIndex, 0, {...transaction})
        
        updatedTransaction.quantity = updatedTransaction.transaction[updatedTransaction.transaction.length-1].quantity
    }

    return await editProduct(updatedTransaction)
}

