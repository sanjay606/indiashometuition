const Joi = require('joi');

const ProductSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  course: Joi.string().min(1).max(100).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  message: Joi.string().min(1).max(500).required(),
});

module.exports = { ProductSchema };
