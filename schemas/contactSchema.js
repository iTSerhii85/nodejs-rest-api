const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

module.exports = contactSchema;
