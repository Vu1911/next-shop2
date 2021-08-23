import { ReducerWithoutAction, useEffect, useReducer, useState } from "react";
import UserForm from "../../components/user-form/user-form.component";
import UserTable from "../../components/user-table/user-table.component";
import { useFetch } from "../../hooks/useAccountApi.hook";
import { IAccount, Role } from "../../interfaces/account.interface";
import { getAllUsers } from "../../services/account.service";
import guardRoute from "../../services/guard.service";



export default function UserDashboard() {

    console.log("reload user dash-board")

  const { data, isLoading, isError } = useFetch(
    "/api/auth/account",
    getAllUsers
  );

  const [isReload, setReload] = useState(false)


  function onHandleCreate(account: IAccount) {
    data.push(account)
    setReload((oldState: boolean) => !oldState)
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <UserForm title="Create" onCreate={onHandleCreate} />
      <UserTable accounts={[...data]} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  return await guardRoute(context, Role.ADMIN, "/admin/signin");
}
