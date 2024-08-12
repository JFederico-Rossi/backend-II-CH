import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

cartSchema.plugin(mongoosePaginate);

export const cartModel = mongoose.model("cart", cartSchema);
