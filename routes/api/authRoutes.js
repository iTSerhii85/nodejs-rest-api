const express = require("express");
const authController = require("../../controllers/authControllers");
const { validateBody } = require("../../decorators");
const {
  registerSchema,
  loginSchema,
  updateSubscribeSchema,
  updateAvatarSchema,
} = require("../../schemas");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

//! signUp routes
router.post(
  "/register",
  upload.single("avatar"), // если в поле avatar приходит файл, сохраняем его в папке avatars.
  validateBody(registerSchema),
  authController.register
);

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

// todo update avatar
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  validateBody(updateAvatarSchema),
  authenticate,
  authController.avatarUploadController
);

module.exports = router;
