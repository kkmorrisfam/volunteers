const express = require("express");
const router = express.Router();
const validate = require("../util/validate");
const {isAuthenticated} = require("../util/authenticate");

const volunteerController = require("../controllers/volunteers");
// const { validate } = require("../models/volunteers");

console.log("loading volunteer route");
router.get("/", volunteerController.getAllVolunteers);
router.get("/:id", volunteerController.getOneVolunteer);

router.post(
  "/",
  isAuthenticated,
  validate.addVolunteerRules(),
  validate.checkValidationErrors,
  volunteerController.createVolunteer
);
router.put(
  "/:id",
  isAuthenticated,
  validate.updateVolunteerRules(),
  validate.checkValidationErrors,
  (req, res, next) => {
    /* #swagger.tags = ['Volunteer']
           #swagger.parameters['body'] = {
             in: 'body',
             required: true,
             schema: {
               firstName: "Carol",
               lastName: "Burnett",
               email: "cburnett@gmail.com",
               phone: "707-465-4655",
               userName: "carol",
               password: "password123"
             }
           }
        */
    return volunteerController.updateVolunteer(req, res, next);
  }
  // volunteerController.updateVolunteer
);
router.delete("/:id", isAuthenticated, volunteerController.deleteVolunteer);

module.exports = router;
