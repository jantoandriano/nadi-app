const Joi = require("joi");

const validateRegister = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().label("first_name"),
    last_name: Joi.string().required().label("last_name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = {
  validateRegister,
  validateLogin,
};
