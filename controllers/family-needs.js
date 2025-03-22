const FamilyInNeed = require("../models/family-needs");
const mongoose = require("mongoose");

const getAllFamilies = async (req, res) => {
  try {
    const family = await FamilyInNeed.find();
    res.status(200).json(family);
  } catch (error) {
    console.error("Error fetching all families in need:", error);
    res
      .status(400)
      .json({ message: "Server error while fetching all families in need." });
  }
};

const getOneFamily = async (req, res) => {
  try {
    console.log("inside getOneFamily");
    const result = await FamilyInNeed.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "Family not found." });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching single family: ", error);
    res.status(400).json({ message: "Server error getting single family." });
  }
};

// Post/ Create route
const createFamily = async (req, res) => {
  try {
    const {
      familyName,
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      comment,
      needDates,
      familySize
    } = req.body;

    const newFamily = new FamilyInNeed({
      familyName,
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      comment,
      needDates: needDates || [], // default to empty array if missing
      familySize
    });

    const savedFamily = await newFamily.save();
    res.status(201).json(savedFamily);
  } catch (error) {
    console.error("Error creating family:", error);
    res.status(500).json({ message: "Server error while creating family." });
  }
};

// Put / Edit route



// Delete Route, delete a family, return status code
const deleteFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FamilyInNeed.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Volunteer not found." });
    }

    res.status(200).json({ message: "Family deleted successfully." });
  } catch (error) {
    console.error("Error deleting family:", error);
    res.status(500).json({ message: "Server error deleting family." });
  }
};

module.exports = {
  getAllFamilies,
  getOneFamily,
  createFamily,
  updateFamily,
  deleteFamily
};
