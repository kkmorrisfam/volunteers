const express = require("express");
const router = express.Router();
const validate = require("../util/validate");

const familyController = require("../controllers/family-needs");

router.get("/", familyController.getAllFamilies);
router.get("/:id", familyController.getOneFamily);
router.post("/", validate.addVolunteerRules)

module.exports = router;