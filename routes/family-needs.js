const express = require("express");
const router = express.Router();
const validate = require("../util/validate");
const { isAuthenticated } = require("../util/authenticate");

const familyController = require("../controllers/family-needs");

router.get("/", familyController.getAllFamilies);
router.get("/:id", familyController.getOneFamily);
router.post(
  "/",
  isAuthenticated,
  validate.addFamilyToFeedRules(),
  validate.checkValidationErrors,
  familyController.createFamily
);

/* #swagger.tags = ['Family']
#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
      familyName: "Smith Family",
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "555-123-4567",
      street: "123 Main St",
      city: "Anytown",
      comment: "Help needed during recovery",
      needDates: ["2025-04-20", "2025-04-21"],
      familySize: 4
    }
} */
router.put(
  "/:id",
  isAuthenticated,
  validate.updateFamilyToFeedRules(),
  validate.checkValidationErrors,
  (req, res, next) => {
    /* #swagger.tags = ['Family']
       #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
           familyName: "Smith Family",
           firstName: "Melba",
           lastName: "Franklin",
           email: "sunflower63@gmail.com",
           phone: "707-951-4142",
           street: "451 Concord St",
           city: "Smith River",
           comment: "Husband is undergoing chemo",
           needDates: ["2025-04-20", "2025-04-21"],
           familySize: 2
         }
       }
    */ return familyController.updateFamily(req, res, next);
  }
);
// familyController.updateFamily);
router.delete("/:id", isAuthenticated, familyController.deleteFamily);

module.exports = router;
