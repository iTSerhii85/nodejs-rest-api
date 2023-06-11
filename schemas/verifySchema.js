const Joi = require("joi");

const verifySchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({ "any.required": "missing required field email" }),
});

module.exports = verifySchema;
