import { Role } from "../interfaces/account.interface"
import guardRoute from "../services/guard.service"

export default function HomePage(){
    return <h1>This is user homepage</h1>
}

export async function getServerSideProps(context: any) {
    return await guardRoute(context, Role.USER, "/")
}