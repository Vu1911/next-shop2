import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import ProductFormStyle from "./product-form.module.css";

export default function ProductForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={ProductFormStyle.generalForm}
    >

        <h2>{props.title? props.title : "Create"} Production</h2>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Image link</label>
        <input
          className={ProductFormStyle.generalInput}
          type="text"
          placeholder="Image Link"
          {...register("imageLink", {})}
        />
      </div>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Product name</label>
        <input
          className={`${ProductFormStyle.generalInput} ${
            errors.productName ? ProductFormStyle.generalInputError : ""
          }`}
          type="text"
          placeholder="Product name"
          {...register("productName", { required: true, maxLength: 100 })}
        />
        {errors.productName?.type === "required" && (
          <span className={ProductFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.productName?.type === "maxLength" && (
          <span className={ProductFormStyle.generalError}>
            product name is too long!
          </span>
        )}
      </div>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Quantity</label>
        <input
          className={`${ProductFormStyle.generalInput} ${
            errors.quantity ? ProductFormStyle.generalInputError : "la"
          }`}
          type="number"
          min={1}
          placeholder="Quantity"
          {...register("quantity", { required: true, min: 1 })}
        />
        {errors.quantity?.type === "required" && (
          <span className={ProductFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.quantity?.type === "min" && (
          <span className={ProductFormStyle.generalError}>
            The minimum quantity is 1
          </span>
        )}
      </div>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Price</label>
        <input
          className={`${ProductFormStyle.generalInput} ${
            errors.price ? ProductFormStyle.generalInputError : ""
          }`}
          type="number"
          placeholder="Price"
          {...register("price", { required: true, min: 1 })}
        />
        {errors.price?.type === "required" && (
          <span className={ProductFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.price?.type === "min" && (
          <span className={ProductFormStyle.generalError}>
            The minimum price is 1
          </span>
        )}
      </div>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Description</label>
        <textarea
          className={`${ProductFormStyle.generalInput} ${
            errors.description ? ProductFormStyle.generalInputError : ""
          }`}
          placeholder="Product description"
          {...register("description", { required: true })}
        />
        {errors.description?.type === "required" && (
          <span className={ProductFormStyle.generalError}>
            This field is required
          </span>
        )}
      </div>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Status</label>
        <select className={ProductFormStyle.generalInput} {...register}>
          <option value="OPEN">OPEN</option>
          <option value=" CLOSE"> CLOSE</option>
        </select>
      </div>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}
