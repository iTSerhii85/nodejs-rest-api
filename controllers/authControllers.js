const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { controllerWrapper } = require("../decorators");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { SECRET_KEY, SERVER_NAME } = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  console.log(req.user);
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

const changeSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.json(result);
};

const avatarUpload = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);

  const resultUpload = await Jimp.read(oldPath);
  await resultUpload.resize(250, 250).write(newPath);

  const avatarURL = path.join(SERVER_NAME, "avatars", filename);
  fs.unlink(oldPath);

  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );

  res.status(200).json({ avatarURL: result.avatarURL });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  changeSubscription: controllerWrapper(changeSubscription),
  avatarUpload: controllerWrapper(avatarUpload),
};
