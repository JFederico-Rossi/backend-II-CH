import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  cartId: { type: Schema.Types.ObjectId, ref: "cart" },
});

// Middleware de mongoose
userSchema.pre("save", function (next) {
  if (this.email.includes("@") && this.email.includes(".")) {
    return next();
  }

  next(new Error("Email en formato no válido. Intentalo de nuevo"));
});

userSchema.pre("save", async function (next) {

  if (this.isModified("password")) {
    try {
      const SALT_ROUNDS = bcrypt.genSaltSync(10)
      this.password =  bcrypt.hashSync(this.password, SALT_ROUNDS)
    } catch (error) {
      return next (error)
    }
  }
  next();
});

export const userModel = model("user", userSchema);
