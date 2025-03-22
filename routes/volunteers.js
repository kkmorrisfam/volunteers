const express = require("express");
const router = express.Router();
const validate = require("../util/validate");

const volunteerController = require("../controllers/volunteers");
// const { validate } = require("../models/volunteers");

console.log("loading volunteer route");
router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getOneVolunteer);

router.post("/", validate.addVolunteerRules(), validate.checkValidationErrors, volunteerController.createVolunteer);
module.exports = router;