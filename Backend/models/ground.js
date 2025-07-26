import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const groundSchema = mongoose.Schema({
  name: String,
  ownername: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  lat: { type: Number },
  lng: { type: Number },
  imgURL: String,     
  coverURL: String,  
  slot: [
    {
      date: String,
      time: [
        {
          bookedby: { type: String, default: "" },
          date: { type: String, default: "" },
          in: { type: String, default: "" },
        },
      ],
          bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking' 
    }]
    },
  ],
});

// This function automatically hashes the password before saving.
groundSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default new mongoose.model("Ground", groundSchema);
