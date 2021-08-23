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
import { Role } from "../interfaces/account.interface";
import { useSessionForSignIn } from "../hooks/useSessionCustom.hook";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useSessionForSignIn(true, Role.USER)
  
  if(isLoading){
    return <> Is Loading ... </>
  }

  return (
        <SignInForm role={Role.USER}/>
  );
};

export default Home;
