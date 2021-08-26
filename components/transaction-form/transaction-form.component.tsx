import { Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TransType } from "../../interfaces/product.interface";
import { addTransaction, createProduct, editProduct } from "../../services/product.service";
import TransactionFormStyle from "./transaction-form.module.css"

export default function TransactionForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [product, setProduct] = useState(props.product)

  useEffect(() => {
      let mount = true
      setProduct(props.product)
      return () => {
          mount = false
      }
  }, [props.product])

  const onSubmit = async (data: any) => {
    data.time += "Z"

    console.log(data)
    console.log(product)

    const updatedProduct = await addTransaction(data, {...product})

    console.log(updatedProduct)

    if(!updatedProduct.error){
      setProduct(updatedProduct)
      props.onFinish(updatedProduct)
    } else {
      console.log(updatedProduct)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={TransactionFormStyle.generalForm}
    >

        <h2>Transaction</h2>

        <div className={TransactionFormStyle.generalFormControl}>
        <label className={TransactionFormStyle.generalLabel}>Transaction Type</label>
        <select 
          className={TransactionFormStyle.generalInput} {...register("transType")}>
          <option value={TransType.BUY}>{TransType.BUY}</option>
          <option value={TransType.SELL}>{TransType.SELL}</option>
        </select>
      </div>


      <div className={TransactionFormStyle.generalFormControl}>
        <label className={TransactionFormStyle.generalLabel}>Volume</label>
        <input
          defaultValue={1}
          className={`${TransactionFormStyle.generalInput} ${
            errors.quantity ? TransactionFormStyle.generalInputError : "la"
          }`}
          type="number"
          min={1}
          placeholder="Volume"
          {...register("volume", { required: true, min: 1 })}
        />
        {errors.volume?.type === "required" && (
          <span className={TransactionFormStyle.generalError}>
            This field is required
          </span>
        )}
        {errors.volume?.type === "min" && (
          <span className={TransactionFormStyle.generalError}>
            The minimum quantity is 1
          </span>
        )}
      </div>

      <div className={TransactionFormStyle.generalFormControl}>
        <label className={TransactionFormStyle.generalLabel}>Transaction Time</label>

        <input
          className={`${TransactionFormStyle.generalInput} ${
            errors.dob ? TransactionFormStyle.generalInputError : ""
          }`}
          type="datetime-local"
          placeholder="Time"
          {...register("time", { required: true })}
        />
        {errors.time?.type === "required" && (
          <span className={TransactionFormStyle.generalError}>
            This field is required
          </span>
        )}
      </div>

      <Space>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>

      <Button type="default" onClick={props.onCancel}>
        Cancel
      </Button>
      </Space>
      
    </form>
  );
}
