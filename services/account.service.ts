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