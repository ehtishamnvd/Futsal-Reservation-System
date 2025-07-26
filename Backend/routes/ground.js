import express from "express";
import bcrypt from "bcryptjs";
import NodeGeocoder from "node-geocoder"; 
import Ground from "../models/ground.js";

const router = express.Router();


const options = {
  provider: "locationiq",
  apiKey: process.env.LOCATIONIQ_API_KEY, 
};
const geocoder = NodeGeocoder(options);

router.post("/register", async (req, res, next) => {
  try {
    const { name, ownername, email, password, phone, address } = req.body;

    const ground = await Ground.findOne({ email });
    if (ground) {
      return res.send({ message: "Ground already Registered" });
    }

    let lat = null;
    let lng = null;

    if (address) {
      try {
        console.log(`Attempting to geocode address with LocationIQ: "${address}"`);
        const geocodeData = await geocoder.geocode(address);
        
        if (geocodeData && geocodeData.length > 0) {
          lat = geocodeData[0].latitude;
          lng = geocodeData[0].longitude;
          console.log(`SUCCESS: Geocoded Address: ${address} -> [${lat}, ${lng}]`);
        } else {
          console.warn(`Could not geocode address: "${address}". The address might be invalid or too vague. Ground will be saved without coordinates.`);
        }
      } catch (geocodeError) {
        console.error("An error occurred during geocoding:", geocodeError.message);
      }
    }

    const newGround = new Ground({
      name,
      ownername,
      email,
      password,
      phone,
      address,
      lat,
      lng, 
    });

    await newGround.save();
    res.send({ message: "Successfully Registered, Please Login Now" });
  } catch (err) {
    console.error("An error occurred during the main registration process:", err);
    res.status(500).send({ message: "An error occurred during registration." });
  }
});


router.get("/test", async (req, res, next) => {
  const grounds = await Ground.find();
  res.send(grounds);
});

router.get("/profile/:_id", async (req, res) => {
  const _id = req.params._id;
  const ground = await Ground.findOne({ _id });
  if (!ground) {
    res.send({ message: "Not found" });
  } else {
    res.send(ground);
  }
});

router.post("/dp", async (req, res) => {
  try {
    const { _id, imgURL } = req.body;
    await Ground.findOneAndUpdate({ _id }, { $set: { imgURL } });
    res.send({ message: "Updated" });
  } catch (error) {
    res.status(500).send({ message: "Error updating profile picture." });
  }
});

router.post("/cover", async (req, res) => {
  const { _id, coverURL } = req.body;
  
  console.log(`--- Received request to update cover photo ---`);
  console.log(`Ground ID: ${_id}`);
  console.log(`Cover URL: ${coverURL}`);

  if (!_id || !coverURL) {
    console.error("Validation failed: Ground ID or coverURL is missing.");
    return res.status(400).send({ message: "Ground ID and coverURL are required." });
  }

  try {
    const updatedGround = await Ground.findOneAndUpdate(
      { _id },
      { $set: { coverURL } }, // Correctly sets the coverURL field in the database
      { new: true }
    );

    if (!updatedGround) {
      console.error(`Update failed: Ground with ID ${_id} not found.`);
      return res.status(404).send({ message: "Ground not found." });
    }

    console.log(`SUCCESS: Updated coverURL for ground: ${updatedGround.name}`);
    res.send({ message: "Cover photo updated successfully" });
  } catch (error) {
    console.error("Database error while updating cover photo:", error);
    res.status(500).send({ message: "Error updating cover photo." });
  }
});

router.post("/login2", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ message: "Fill all the Fields" });
    }
    const ground = await Ground.findOne({ email: email });
    if (ground) {
      const isMatch = await bcrypt.compare(password, ground.password);
      if (!isMatch) {
        res.send({ message: "Password didn't match" });
      } else {
        res.send({ message: "Login Successsfully", ground });
      }
    } else {
      return res.send({
        message: "Ground not Registered, Please make an account first",
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/getSlot", async (req, res) => {
  try {
    const { _id, date } = req.body;
    const ground = await Ground.findOne({ _id });
    if (!ground) {
      return res.status(404).json({ error: "Ground not found" });
    }
    const slots = ground.slot;
    const matchedSlot = slots.find((item) => item.date === date);
    if (matchedSlot) {
      return res.json(matchedSlot.time);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/bookSlot", async (req, res) => {
  try {
    const { _id, date, name, index } = req.body;
    const ground = await Ground.findOne({ _id });
    const slot = ground.slot;
    let times = [];
    let flag = false;
    const data = {
      bookedby: name,
      date: date,
      in: index,
    };
    slot.map((item, index) => {
      if (item.date == date) {
        times = item.time;
        flag = true;
      }
    });
    if (flag == true) {
      times[index] = data;
      await Ground.findOneAndUpdate(
        { _id, "slot.date": date },
        {
          $push: {
            "slot.$[date].time": {
              $each: [data],
              $position: index,
            },
          },
        },
        {
          arrayFilters: [{ "date.date": date }],
        }
      );
      res.send({ message: "Successfully Booked " });
    } else {
      times.push(data);
      let dat = { date, time: times };
      await Ground.findOneAndUpdate(
        { _id },
        {
          $push: {
            slot: dat,
          },
        }
      );
      res.send({ message: "Successfully Booked " });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

router.post("/undoSlot", async (req, res) => {
  try {
    const { index, _id, date } = req.body;
    await Ground.findOneAndUpdate(
      { _id },
      {
        $pull: {
          "slot.$[date].time": { in: index },
        },
      },
      {
        arrayFilters: [{ "date.date": date }],
      }
    );
    res.send({ message: "Sucessfully Removed " });
  } catch (error) {
    res.send({ error: error });
  }
});

export default router;
