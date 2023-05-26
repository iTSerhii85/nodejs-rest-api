const express = require("express");
const contactsController = require("../../controllers/contactControllers");
const { validateBody, validateStatusContact } = require("../../decorators");
const { contactSchema, updateFavoriteSchema } = require("../../schemas");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

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
