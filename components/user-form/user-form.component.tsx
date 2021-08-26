import { Button, Space } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { IAccount } from "../../interfaces/account.interface";
import {
  checkUsernameUnique,
  createUser,
  editUser,
} from "../../services/account.service";
import UserFormStyle from "./user-form.module.css";

export default function UserForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    data.dob = new Date(data.dob);
    
    let message: any;

    if (props.title == "Create") {
      message = await createUser(data);
    }

    if (props.title == "Edit") {
      data._id = props.data._id
      message = await editUser(data);
    }

    console.log(message);

    if (!message.error) {
      props.onFinish(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={UserFormStyle.generalForm}
    >
      <h2>{props.title ? props.title : "Creating"} User</h2>
      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Username</label>
        <input
          defaultValue={props.data ? props.data.username : null}
          className={`${UserFormStyle.generalInput} ${
            errors.username ? UserFormStyle.generalInputError : ""
          }`}
          type="text"
          placeholder="Username"
          {...register("username", {
            required: true,
            maxLength: 30,
            validate: {
              unique: async (value: string) =>
                await checkUsernameUnique({ value: value, type: props.title, oldValue: props.data.username }),
            },
          })}
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
        {errors.username?.type === "unique" && (
          <span className={UserFormStyle.generalError}>Username is used!</span>
        )}
      </div>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Email</label>
        <input
          defaultValue={props.data ? props.data.email : null}
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

      {props.title == "Create" && (
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
      )}

      {props.title == "Edit" && (
        <div className={UserFormStyle.generalFormControl}>
          <label className={UserFormStyle.generalLabel}>Password</label>
          <input
            
            defaultValue={props.data.password}
            className={`${UserFormStyle.generalInput} ${
              errors.password ? UserFormStyle.generalInputError : ""
            }`}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
      )}

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Date of Birth</label>

        <input
          defaultValue={props.data ? props.data.dob.substring(0, 10) : ""}
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
        <select
          defaultValue={
            props.data && props.data.role == "Admin" ? "Admin" : "User"
          }
          className={UserFormStyle.generalInput}
          {...register("role")}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className={UserFormStyle.generalFormControl}>
        <label className={UserFormStyle.generalLabel}>Status</label>
        <select
          defaultValue={
            props.data && props.data.status == "Deactivated"
              ? "Deactivated"
              : "Activated"
          }
          className={UserFormStyle.generalInput}
          {...register("status")}
        >
          <option value="Activated">Activated</option>
          <option value="Deactivated">Deactivated</option>
        </select>
      </div>

      <Space>
        <Button type="primary" htmlType="submit">
          {props.title ? props.title : "Submit"}
        </Button>

        <Button type="default" onClick={props.onCancel}>
          Cancel
        </Button>
      </Space>
    </form>
  );
}
