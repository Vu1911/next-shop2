import { getSession } from "next-auth/client"
import { Role } from "../interfaces/account.interface"

export default async function guardRoute(context: any, role: Role, redirect: string) {
    const session = await getSession({req: context?.req})

    if(!session || session.user?.name != role) {
        return {
            redirect: {
                destination: redirect,
                permanent: false
            }
        }
    };

    return {
        props: { session }
    }
}