import mongoose from "mongoose";
import { Model } from "mongoose";
import { IAccount } from "../interfaces/account.interface";
import { IProduct, TransType } from "../interfaces/product.interface";

let Schema = mongoose.Schema;

let productSchema = new Schema({
  imgUrl: {
    type: String,
    trim: true,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["OPEN", "CLOSE"],
      message: "{VALUE} is not supported!",
    },
  },
  transaction: {
     type: [
       {transType: {
         type: String, 
         enum: {
           values: [TransType.BUY, TransType.SELL], 
           message: "{VALUE} is not support!"
          }
        }, 
        volume: Number,
        quantity: Number,
        time: Date
      }
    ]
  }
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product

