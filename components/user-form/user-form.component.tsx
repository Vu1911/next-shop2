import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { IAccount } from "../../interfaces/account.interface";
import { createUser } from "../../services/account.service";
import UserFormStyle from "./user-form.module.css";

export default function UserForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data: IAccount) => {
    
    data.dob = new Date(data.dob)
    console.log(data)
    const message = await createUser(data)
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={UserFormStyle.generalForm}
    >
      <h2>{props.title ? props.title : "Create"} User</h2>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Username</label>
        <input
          className={`${UserFormStyle.generalInput} ${
            errors.username ? UserFormStyle.generalInputError : ""
          }`}
          type="text"
          placeholder="Username"
          {...register("username", { required: true, maxLength: 30 })}
        />
        {errors.username?.type === "required" && (
          <span className={UserFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.username?.type === "maxLength" && (
          <span className={UserFormStyle.generalError}>
            Username is too long!
          </span>
        )}
      </div>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Email</label>
        <input
          className={`${UserFormStyle.generalInput} ${
            errors.email ? UserFormStyle.generalInputError : ""
          }`}
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <span className={UserFormStyle.generalError}>
            This field is required
          </span>
        )}
      </div>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Password</label>
        <input
          className={`${UserFormStyle.generalInput} ${
            errors.password ? UserFormStyle.generalInputError : ""
          }`}
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password?.type === "required" && (
          <span className={UserFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.password?.type === "minLength" && (
          <span className={UserFormStyle.generalError}>
            Password is too short!
          </span>
        )}
      </div>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Date of Birth</label>

        <input
          className={`${UserFormStyle.generalInput} ${
            errors.dob ? UserFormStyle.generalInputError : ""
          }`}
          type="date"
          placeholder="Date of Birth"
          {...register("dob", { required: true })}
        />
        {errors.dob?.type === "required" && (
          <span className={UserFormStyle.generalError}>
            This field is required
          </span>
        )}
      </div>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Role</label>
        <select className={UserFormStyle.generalInput} {...register("role")}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Status</label>
        <select className={UserFormStyle.generalInput} {...register("status")}>
          <option value="Activated">Activated</option>
          <option value="Deactivated">Deactivated</option>
        </select>
      </div>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}
