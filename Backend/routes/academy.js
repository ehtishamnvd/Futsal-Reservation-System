import express from "express";

const router = express.Router();

//Model
import Academy from "../models/academy.js";

router.get("/users/:name", async (req, res) => {
  const name = req.params.name;
  const academy = await Academy.find({ myacademy: name });
  if (!academy) {
    res.send({});
  } else {
    res.send(academy);
  }
});

// /academy/test
router.get("/test3", async (req, res, next) => {
  const academies = await Academy.find();
  res.send(academies);
});

router.post("/academyformregister", async (req, res) => {
 
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

export default router;
