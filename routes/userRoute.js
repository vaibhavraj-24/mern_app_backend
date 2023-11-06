const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/userModel');

const router = express.Router();


//create 
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  const User = require("../models/userModel");
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});


//get

router.get("/", async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//get single user
router.get("/:id",async (req,res)=> {

    const {id} = req.params;

    try {
      const singleUser = await User.findById({_id : id});
      res.status(200).json(singleUser);
    } catch (error) {
      console.log(error);
      res.send(500).json({ error: error.message }); 
    }
    
  });


  // delete
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const singleUser = await User.findByIdAndDelete(id);
      if (!singleUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(singleUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  //update

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
