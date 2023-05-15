const express = require("express");
const contactsController = require("../../controllers/contactControllers");
const router = express.Router();
const { validateBody } = require("../../decorators");
const { contactSchema } = require("../../schemas");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", validateBody(contactSchema), contactsController.addContact);

router.put(
  "/:contactId",
  validateBody(contactSchema),
  contactsController.updateContactById
);

router.delete("/:contactId", contactsController.deleteContactById);

module.exports = router;
