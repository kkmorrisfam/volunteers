const express = require("express");
const router = express.Router();

const volunteerController = require("../controllers/volunteers");

console.log("loading volunteer route");
router.get("/", volunteerController.getAllVolunteers);

module.exports = router;