import express from "express";
import bcrypt from "bcryptjs";

const router = express.Router();

//Model
import Team from "../models/team.js";
import Ground from "../models/ground.js";

//ALL TEAMS AND GROUND
router.get("/all/:_id", async (req, res) => {
  const _id = req.params._id;
  let k = "new ObjectId(";
  const team = await Team.find({});
  const ground = await Ground.find({});
  const all = team.concat(ground);
  let complete = [];
  all.map((item, index) => {
    if (item._id.toString() != _id) {
      complete.push(item);
    }
  });
  // console.log(complete);
  // console.log(_id, `new ObjectId(\"${_id}\")`);
  res.send(complete);
});

//GET PROFILE DETAILS
router.get("/profile/:_id", async (req, res) => {
  const _id = req.params._id;
  const team = await Team.findOne({ _id });
  if (!team) {
    res.send({ message: "Not found" });
  } else {
    res.send(team);
  }
});

// /team/test
router.get("/test", async (req, res, next) => {
  const teams = await Team.find({});
  res.send(teams);
});
router.post("/dp", async (req, res) => {
  try {
    const { _id, imgURL } = req.body;

    const team = await Team.findOneAndUpdate(
      { _id },
      {
        $set: {
          imgURL,
        },
      }
    );
    res.send({ message: "Updated" });
  } catch (error) {}
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ message: "Fill all the Fields" });
    }
    const team = await Team.findOne({ email: email });
    console.log("team", team);

    if (team) {
      const isMatch = await bcrypt.compare(password, team.password);
      if (!isMatch) {
        res.send({ message: "Password didn't match" });
      } else {
        res.send({ message: "Login Successsfully", team });
      }
    } else {
      return res.send({
        message: "Team not Registered, Please make an account first",
      });
    }
  } catch (err) {
    console.log('error',err);
    res.send(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, captainName, email, password, phone, address } = req.body;
    const team = await Team.findOne({ email });
    if (team) {
      res.send({ message: "Team already Registered" });
    }
    //Creating. Enter data in database
    //teamname:teamname;
    else {
      const newTeam = new Team({
        name,
        captainName,
        email,
        password,
        phone,
        address,
      });
      await newTeam.save();
      res.send({ message: "Successfully Registered, Please Login Now" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/setStatus/:teamId", async (req, res, next) => {
  console.log("ROUTE ACTIVATED");
  const { status } = req.body;
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    const statusArray = team.statusArray;
    console.log(statusArray);
    statusArray.push(status);
    team.statusArray = statusArray;
    await team.save();
    res.send({ message: "Success", statusArray });
  } catch (err) {
    res.send(err);
  }
});
router.get("/getStatus/:teamId", async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    const statusArray = team.statusArray;
    res.send({ message: "Success", statusArray });
    console.log(statusArray);
  } catch (err) {
    res.send(err);
  }
});

export default router;
