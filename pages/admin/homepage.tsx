import { Button } from "antd"
import { getSession, signOut } from "next-auth/client"
import { Role } from "../../interfaces/account.interface"
import guardRoute from "../../services/guard.service"

export default function AdminHomepage () {
    // useSessionCustom(true, Role.ADMIN)

    const handleLogout = async () => {
        await signOut()
    }

    return <>
        <h1> This is admin home page, if you do not have a suitable session, you can not get in here </h1>
        <Button type="primary" onClick={handleLogout} >Logout</Button>
    </>
}

export async function getServerSideProps(context: any) {
    return await guardRoute(context, Role.ADMIN, "/admin/signin")
}