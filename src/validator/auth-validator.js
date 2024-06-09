const Joi = require('joi');

exports.registerSchema = Joi.object({
  characterName: Joi.string().min(4).max(15).required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).strip(),
});

exports.loginSchema = Joi.object({
  characterNameOrEmail: Joi.alternatives()
    .try(
      Joi.string().email().required(), // For email
      Joi.string().required() // For character name
    )
    .required(),
  password: Joi.string().required(),
});
