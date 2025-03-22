const express = require("express");
const router = express.Router();
const validate = require("../util/validate");

const volunteerController = require("../controllers/volunteers");
// const { validate } = require("../models/volunteers");

console.log("loading volunteer route");
router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getOneVolunteer);

router.post("/", validate.addVolunteerRules(), validate.checkValidationErrors, volunteerController.createVolunteer);
router.put("/:id",validate.updateVolunteerRules(), validate.checkValidationErrors, volunteerController.updateVolunteer);
router.delete("/:id", volunteerController.deleteVolunteer);

module.exports = router;
