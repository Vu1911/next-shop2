import axios from "axios";
import { IAccount } from "../interfaces/account.interface";

export async function createUser(account: IAccount) {
    try {
        const response = await axios.post('/api/auth/account', account)
        console.log(response)
        return {message: `Create user ${response.data.username} successfully!`}
    } catch (error) {
        return {message: `Fail to create user!`}
    }
} 