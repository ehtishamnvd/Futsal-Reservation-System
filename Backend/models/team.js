import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const teamSchema = mongoose.Schema({
  name: String,
  captainName: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  statusArray: {
    type: Array,
    default: [],
  },
  imgURL: String,
});

teamSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default new mongoose.model("Team", teamSchema);
