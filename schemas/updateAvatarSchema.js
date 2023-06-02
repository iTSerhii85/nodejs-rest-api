const Joi = require("joi");

const updateAvatarSchema = Joi.object({
  subscription: Joi.required().messages({
    "any.required": "missing field avatar",
  }),
});

module.exports = updateAvatarSchema;
