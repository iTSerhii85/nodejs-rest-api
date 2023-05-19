// const contactsService = require("../models/contactService");
const { HttpError } = require("../helpers");
const { controllerWrapper } = require("../decorators");
const Contact = require("../models/contact");

const getAllContacts = async (_, res) => {
  const result = await Contact.find();
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
  const result = await Contact.create(req.body);
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

const updateFavorite = async (req, res) => {
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
  updateFavorite: controllerWrapper(updateFavorite),
  deleteContactById: controllerWrapper(deleteContactById),
};
