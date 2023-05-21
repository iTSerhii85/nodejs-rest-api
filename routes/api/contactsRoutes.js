const express = require("express");
const contactsController = require("../../controllers/contactControllers");
const router = express.Router();
const { validateBody, validateStatusContact } = require("../../decorators");
const { contactSchema, updateFavoriteSchema } = require("../../schemas");
const { isValidId } = require("../../middlewares");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post("/", validateBody(contactSchema), contactsController.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(contactSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateStatusContact(updateFavoriteSchema),
  contactsController.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

module.exports = router;
