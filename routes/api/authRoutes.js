const express = require("express");
const authController = require("../../controllers/authControllers");
const { validateBody } = require("../../decorators");
const {
  registerSchema,
  loginSchema,
  updateSubscribeSchema,
} = require("../../schemas");
const { authenticate } = require("../../middlewares");

const router = express.Router();

//! signUp routes
router.post("/register", validateBody(registerSchema), authController.register);

//! signIn routes
router.post("/login", validateBody(loginSchema), authController.login);

//! get current user routes
router.get("/current", authenticate, authController.getCurrent);

//! logOut routes
router.post("/logout", authenticate, authController.logout);

//! subscription
router.patch(
  "/",
  authenticate,
  validateBody(updateSubscribeSchema),
  authenticate,
  authController.changeSubscription
);

module.exports = router;
