import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as CONSTANT from "./Constants/constants.js";

import bcrypt from "bcryptjs";

// Configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  CONSTANT.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database Connected");
  }
);

const academySchema = new mongoose.Schema({
  studentname: String,
  fathername: String,
  email: String,
  age: Number,
  contact: Number,
  address: String,
  myacademy: String,
});

const Academy = new mongoose.model("Academy", academySchema);

app.post("/academyformregister", async (req, res) => {
  //console.log(req.body)

  const { studentname, fathername, email, age, contact, address, myacademy } =
    req.body;
  Academy.findOne({ email: email }, (err, mongoacademy) => {
    if (mongoacademy) {
      res.send({
        message:
          "Student already Registered with this Email. Try something new. ",
      });
    }
    //Creating. Enter data in database
    else {
      const mongoacademy = new Academy({
        studentname,
        fathername,
        email,
        age,
        contact,
        address,
        myacademy,
      });

      mongoacademy.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Student Successfull Registered to Academy" });
        }
      });
    }
  });
});

MongoClient.connect(url, (err, db) => {
  if (err) throw error;
  const dbo = db.db("bookmyslot");

  dbo
    .collection("teams")
    .aggregate([
      {
        $lookup: {
          from: "academies",
          localField: "myacademy",
          foreignField: "_id",
          as: "new_data",
        },
      },
    ])
    .toArray((err, res) => {
      if (err) throw err;
      console.log(JSON.stringify(res));
      db.close();
    });
});
app.listen(CONSTANT.PORT, () => {
  console.log("Academyformbackend started at port 9006");
});
