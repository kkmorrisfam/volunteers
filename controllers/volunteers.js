const Volunteer = require("../models/volunteers");
const mongoose = require("mongoose");

const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers: ", error);
    res
      .status(400)
      .json({ message: "Server error while fetching volunteers." });
  }
};

const getOneVolunteer = async (req, res) => {
  try {
    const result = await Volunteer.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "Volunteer not found." });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching single volunteer: ", error);
    res.status(400).json({ message: "Server error getting single volunteer." });
  }
};

// Post/ Create route
const createVolunteer = async (req, res) => {
  console.log("Beginning createVolunteer/request body:", req.body);

  const { firstName, lastName, email, phone, userName, password } = req.body;
  const newVolunteer = new Volunteer({
    firstName,
    lastName,
    email,
    phone,
    userName,
    password,
  });

  try {
    // this should be caught in validation chain
    if (!userName || !password) {
      res
        .status(400)
        .json({ message: "Username or password cannot be empty." });
      return;
    }

    // const volunteer = new Volunteer(req.body);  // if I do it this way, each field doesn't show up in swagger api-docs
    await newVolunteer.save();
    res.status(201).json(newVolunteer);
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(400).json({ message: "Server error adding volunteer." });
  }
};

// Put / Edit route
const updateVolunteer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid volunteer ID." });
  }

  try {
    const updated = await Volunteer.findByIdAndUpdate(id, req.body, {
      new: true, // on true, returns updated data to client
      runValidators: true, // re-runs schema validation before update
    });

    if (!updated) {
      return res.status(404).json({ message: "Volunteer not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating volunteer:", error);
    res.status(500).json({ message: "Server error updating volunteer." });
  }
};

// Delete Route
const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Volunteer.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Volunteer not found." });
    }

    res.status(200).json({ message: "Volunteer deleted successfully." });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ message: "Server error deleting volunteer." });
  }
};

module.exports = {
  getAllVolunteers,
  getOneVolunteer,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
