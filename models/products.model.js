import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },

  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnails: {
    type: [String],
    require: false,
  },
});

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model("Product", productSchema)

