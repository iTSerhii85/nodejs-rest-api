const express = require("express");
const contactsController = require("../../controllers/contactControllers");
const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.put("/:contactId", contactsController.updateContactById);

router.delete("/:contactId", contactsController.deleteContactById);

module.exports = router;
