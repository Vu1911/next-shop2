import { Button } from "antd";
import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import ProductForm from "../components/product-form/product-form.component";
import SignInForm from "../components/signin-form/signin-form.component";
import UserForm from "../components/user-form/user-form.component";
import styles from "../styles/Home.module.css";
import { signOut } from 'next-auth/client'

const Home: NextPage = () => {
  const [session, loading] = useSession();

  console.log(session)

  function handleLogOut(e: any){
    e.preventDefault()
    signOut()
  }

  return (
    <>
      {!session && !loading &&
        <SignInForm />
      }
      {session && 
        <Button type="primary" onClick={handleLogOut}>Log out</Button>
      }
      {session && session.user?.name === "Admin" &&
        <UserForm/>
      }

    </>
  );
};

export default Home;
