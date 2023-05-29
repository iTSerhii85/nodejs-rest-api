const Joi = require("joi");

const updateSubscribeSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid("starter", "pro", "business")
    .messages({
      "any.required": "missing field favorite",
      "any.only": "Can be only 'starter', 'pro', 'business'",
    }),
});

module.exports = updateSubscribeSchema;
