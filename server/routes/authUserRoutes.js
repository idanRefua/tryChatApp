const express = require("express");
const router = express.Router();
require("dotenv").config();
const userModal = require("../models/userModel.js");
const bcrypt = require("../config/bcryptPass.js");
const jsonToken = require("../config/jsonToken.js");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const users = await userModal.findUserByEmail(req.body.email);
    if (users.length === 0) {
      const hashPass = await bcrypt.createPassword(req.body.password);
      const addUser = await userModal.addUser({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
      });
      res.status(200).json({ user: addUser });
    } else {
      throw "There is already user with that email address";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const users = await userModal.findUserByEmail(body.email);

    if (users.length > 0) {
      const correctPassowrd = await bcrypt.comparePassword(
        body.password,
        users[0].password
      );
      if (correctPassowrd) {
        const token = await jsonToken.generateToken({
          _id: users[0]._id,
          name: users[0].name,
          email: users[0].email,
          admin: users[0].admin,
        });

        res.status(200).json({ token });
      } else {
        throw "password incorrect";
      }
    } else {
      throw "There is no user with that email or email incorrect";
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/allusers", authMiddleware, async (req, res) => {
  try {
    const userInfo = req.userDataToken;

    const users = await userModal.allUsers();
    const usersNames = users
      .filter((user) => user._id.toHexString() !== userInfo._id)
      .map((user) => {
        return { name: user.name, _id: user._id };
      });

    res.status(200).json(usersNames);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
