import { Button, Space } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { createProduct, editProduct } from "../../services/product.service";
import ProductFormStyle from "./product-form.module.css";

export default function ProductForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    
    let message: any;

    

    if (props.title == "Create") {
      message = await createProduct(data);
    }

    if (props.title == "Edit") {
      data._id = props.data._id
      message = await editProduct(data);
    }

    console.log(message);

    if (!message.error) {
      props.onFinish(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={ProductFormStyle.generalForm}
    >

        <h2>{props.title? props.title : "Create"} Production</h2>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Image link</label>
        <input
          defaultValue={(props.data)? props.data.imgUrl : null}
          className={ProductFormStyle.generalInput}
          type="text"
          placeholder="Image Link"
          {...register("imgUrl", {})}
        />
      </div>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Product name</label>
        <input
          defaultValue={(props.data)? props.data.title : null}
          className={`${ProductFormStyle.generalInput} ${
            errors.productName ? ProductFormStyle.generalInputError : ""
          }`}
          type="text"
          placeholder="Product name"
          {...register("title", { required: true, maxLength: 100 })}
        />
        {errors.title?.type === "required" && (
          <span className={ProductFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.title?.type === "maxLength" && (
          <span className={ProductFormStyle.generalError}>
            product name is too long!
          </span>
        )}
      </div>

      <div className={ProductFormStyle.generalFormControl}>
        <label className={ProductFormStyle.generalLabel}>Quantity</label>
        <input
          defaultValue={(props.data)? props.data.quantity : null}
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
          defaultValue={(props.data)? props.data.price : null}
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
          defaultValue={(props.data)? props.data.description : null}
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
        <select 
          className={ProductFormStyle.generalInput} {...register("status")}>
          <option value="OPEN" selected={(props.data && props.data.status=="OPEN")? true : false} >OPEN</option>
          <option value="CLOSE" selected={(props.data && props.data.status=="CLOSE")? true : false}>CLOSE</option>
        </select>
      </div>

      <Space>
      <Button type="primary" htmlType="submit">
        {(props.title)? props.title : "Submit"}
      </Button>

      <Button type="default" onClick={props.onCancel}>
        Cancel
      </Button>
      </Space>
      
    </form>
  );
}
