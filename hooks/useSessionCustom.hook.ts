import { getSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { Role } from "../interfaces/account.interface"

export const useSessionForSignIn = (initialValue: boolean, roleGuard: Role) => {
    const [isLoading, setIsLoading] = useState(initialValue)

    const router = useRouter()

    useEffect(() => {
        getSession().then(session => {
            if(!session || session.user?.name != roleGuard){
                setIsLoading(false)
            } else {
                router.replace("homepage")
            }
        })
    }, [roleGuard, router])

    return [isLoading, setIsLoading]
}