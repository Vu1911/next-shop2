import { Alert, Button } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SignInFormStyle from "./signin-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { Role } from "../../interfaces/account.interface";

export default function SignInForm(props: any) {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      role: props.role,
    });

    console.log(result);

    if (!result?.error) {
      router.replace("homepage");
    } else {
      setError(result.error)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={SignInFormStyle.generalForm}
    >
      <h2>Sign In</h2>

      {error != "" && (
        <Alert
          message={error}
          type="error"
          closable
        />
      )}

      <div className={SignInFormStyle.generalFormControl}>
        <label className={SignInFormStyle.generalLabel}>Username</label>
        <input
          className={`${SignInFormStyle.generalInput} ${
            errors.username ? SignInFormStyle.generalInputError : ""
          }`}
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && (
          <span className={SignInFormStyle.generalError}>
            This field is required
          </span>
        )}
      </div>

      <div className={SignInFormStyle.generalFormControl}>
        <label className={SignInFormStyle.generalLabel}>Password</label>
        <input
          className={`${SignInFormStyle.generalInput} ${
            errors.password ? SignInFormStyle.generalInputError : ""
          }`}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <span className={SignInFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.password?.type === "minLength" && (
          <span className={SignInFormStyle.generalError}>
            Password is too short!
          </span>
        )}
      </div>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}
