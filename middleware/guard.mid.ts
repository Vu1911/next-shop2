import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { Role } from "../interfaces/account.interface";

export default function checkRole(role: Role, handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getSession({req: req});

        if(!session || session.user?.name != role){
            return res.status(401).json({message: "Not authenticated!"})
        } else {
            return await handler(req, res)
        }
    }
}