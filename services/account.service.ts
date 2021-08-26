import axios from "axios";
import { IAccount } from "../interfaces/account.interface";

export async function createUser(account: IAccount) {
    try {
        const response = await axios.post('/api/auth/account', account)
        return response.data
    } catch (error) {
        return {error: `Fail to create user! ${error.message}`}
    }
} 

export const getAllUsers = async (url: string) => {
        const res = await axios.get(url)
        if (res.status != 200) {
            const error = new Error('An error occurred while fetching the data.')
            error.message = await res.data
            throw error
        }

        res.data.forEach((data: any) => data["key"] = data._id)
       return await res.data
}

export async function checkUsernameUnique(data: any) {
    try {
        console.log(data)

        const username = data.value
        
        if (data.type == "Edit") {
            if(username == data.oldValue){
                return true
            }
        }

        const response = await axios.get(`/api/auth/account?username=${username}`)
        console.log(response.data)
        if(response.data.length != 0) {
            return false
        } else {
            return true
        }
    } catch (error) {
        return false
    }
}

export async function editUser(user: any){
    try {
        console.log(user)
        const response = await axios.put('/api/auth/account', user)
        return response.data
    } catch (error) {
        return {error: `Fail to create user! ${error.message}`}
    }
}

export async function deleteUser(username: string) {
    const res = await axios.delete(`/api/auth/account?username=${username}`)
        if (res.status != 200) {
            const error = new Error('An error occurred while fetching the data.')
            error.message = await res.data
            throw error
        }
        return res
}

