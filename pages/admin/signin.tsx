import SignInForm from "../../components/signin-form/signin-form.component";
import { useSessionForSignIn } from "../../hooks/useSessionCustom.hook";
import { Role } from "../../interfaces/account.interface";

export default function AdminSignIn(){
    const [isLoading, setIsLoading] = useSessionForSignIn(true, Role.ADMIN)
  
    if(isLoading){
      return <> Is Loading ... </>
    }
    
    return <> 
        <h1>This is Admin Sign in page!</h1>
        <SignInForm role={Role.ADMIN}/>
    </>
}