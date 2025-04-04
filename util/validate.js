const { check, validationResult } = require("express-validator");
//check will use body, param and query to validate

const validate = {};

/*
 *  Validation Rules to Add Volunteer
 */
validate.addVolunteerRules = () => {
  return [
    // firstname is required and must be string
    check("firstName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), //on error this message is sent

    //lastname is required and must be string
    check("lastName")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), //on error this message is sent
    // valid email is required
    check("email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email."), //on error this message is sent
    // check("phone").trim().notEmpty()
    check("phone")
      .trim()
      .notEmpty()
      .matches(/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/)
      .withMessage("Phone number must be a valid US phone number"),
    check("userName").trim().escape().notEmpty(),
    check("password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ];
};

validate.updateVolunteerRules = () => {
  return [
    // firstname is optional on update
    check("firstName")
      .optional()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("First name can't be empty of provided."), //on error this message is sent

    //lastname is optional on update
    check("lastName")
      .optional()
      .trim()
      .escape()
      .isLength({ min: 2 })
      .withMessage("Last name can't be empty if provided."), //on error this message is sent
    // valid email is required
    check("email")
      .optional()
      .trim()
      .escape()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email."), //on error this message is sent
    // check("phone").trim().notEmpty()
    check("phone")
      .optional()
      .trim()
      .matches(/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/)
      .withMessage("Phone number must be a valid US phone number"),
    check("userName").optional().trim().escape().notEmpty(),
    check("password")
      .optional()
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
    check("service.*.familyInNeedId").optional().isMongoId(),
    check("service.*.volunteerDate").optional().isString(),
    check("service.*.meal").optional().isString(),
  ];
};

validate.checkValidationErrors = (req, res, next) => {
  console.log("inside validate");
  const errors = validationResult(req);
  //if errors is not empty
  if (!errors.isEmpty()) {
    //status 400 = Bad Request
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/*
 *  Validation Rules to Add Family In Need
 */
validate.addFamilyToFeedRules = () => {
  return [
    check("familyName", "Enter the family name to feed.")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 }),
    check("firstName", "Enter the first name of the family contact person.")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 }),
    check("lastName", "Enter the last name of the family contact person.")
      .trim()
      .escape()
      .isLength({ min: 3 }),
    check("email", "Enter the email of the family contact person.")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check("phone", "Enter the phone number of the family contact person.")
      .trim()
      .notEmpty()
      .matches(/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/)
      .withMessage("Phone number must be a valid US phone number"),
    check("street", "Enter street address where food will be delivered to.")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 }),
    check("city", "Enter city for meal delivery address.")
      .trim()
      .escape()
      .notEmpty(),
    check("comment", "Enter comments.").trim().escape(),
    check("familySize").trim().escape().isNumeric(),
  ];
};

validate.updateFamilyToFeedRules = () => {
  return [
    check("familyName", "Enter the family name to feed.")
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 }),
    check("firstName", "Enter the first name of the family contact person.")
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 }),
    check("lastName", "Enter the last name of the family contact person.")
      .optional()
      .trim()
      .escape()
      .isLength({ min: 3 }),
    check("email", "Enter the email of the family contact person.")
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
    check("phone", "Enter the phone number of the family contact person.")
      .optional()
      .trim()
      .notEmpty()
      .matches(/^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/)
      .withMessage("Phone number must be a valid US phone number"),
    check("street", "Enter street address where food will be delivered to.")
      .optional()
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 }),
    check("city", "Enter city for meal delivery address.")
      .optional()
      .trim()
      .escape()
      .notEmpty(),
    check("comment", "Enter comments.").optional().trim().escape(),
    check("familySize").optional().trim().escape().isNumeric(),
  ];
};

// validate.updateFamilyRules = () => [
//   check("email").optional().isEmail().withMessage("Email must be valid."),
//   check("phone")
//     .optional()
//     .isMobilePhone("en-US")
//     .withMessage("Phone number must be valid."),
//   check("familyName")
//     .optional()
//     .notEmpty()
//     .withMessage("Family name cannot be empty."),
//   check("city").optional().notEmpty().withMessage("City cannot be empty."),
//   check("needDates")
//     .optional()
//     .isArray()
//     .withMessage("Need dates must be an array of strings."),
// ];

module.exports = validate;
