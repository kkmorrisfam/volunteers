const Volunteer = require("../models/volunteers");

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

// Delete Route

module.exports = {
  getAllVolunteers,
  getOneVolunteer,
  createVolunteer,
};
