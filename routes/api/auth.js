const express = require("express");
const authController = require("../../controllers/authControllers");
const { validateBody } = require("../../decorators");
const { registerSchema, loginSchema } = require("../../schemas");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(registerSchema),
  authController.register
);

router.post("/users/login", validateBody(loginSchema), authController.login);

module.exports = router;
