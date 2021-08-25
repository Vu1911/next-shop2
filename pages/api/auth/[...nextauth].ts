import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { AccountStatus, IAccount } from "../../../interfaces/account.interface";
import { verifyPassword } from "../../../middleware/bcrypt.mid";
import { dbConnect } from "../../../middleware/connectDB.mid";
import User from "../../../models/account.model";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials: any) {

                await dbConnect()

                const user: IAccount | null = await User.findOne({username: credentials.username}).exec()

                console.log(user)
                console.log(credentials.username)

                if (!user){
                    throw new Error('No user found!')
                }

                if(user.role != credentials.role){
                    throw new Error('Account role is not permitted!')
                }

                if(user.status != AccountStatus.ACTIVATED){
                    throw new Error('Account is not activated!')
                }

                
                const isValid = await verifyPassword(credentials.password, user.password)
                
                if(!isValid){
                    throw new Error('Wrong credential values!')
                }

                return {email: user.email, name: user.role}
            }
        })
    ]
})