const { HttpError } = require("../helpers");
const { controllerWrapper } = require("../decorators");
const Contact = require("../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user; // const owner = req.user._id;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "name email phone favorite", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user; // const owner = req.user._id;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json({ message: `Contact with id: ${id} deleted` });
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  updateContactById: controllerWrapper(updateContactById),
  updateStatusContact: controllerWrapper(updateStatusContact),
  deleteContactById: controllerWrapper(deleteContactById),
};
