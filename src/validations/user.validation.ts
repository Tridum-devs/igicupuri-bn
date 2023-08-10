import * as Joi from 'joi';

export const createUserValidation = Joi.object({
  firstName: Joi.string().required().empty().min(3).max(40),
  lastName: Joi.string().required().empty().min(3).max(40),
  email: Joi.string().email().required().empty().max(40),
  password: Joi.string()
    .required()
    .empty()
    .pattern(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*\s).{8,}$/,
    )
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain at least 8 characters including at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    }),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().email().required().empty().max(40),
  password: Joi.string()
    .required()
    .empty()
    .pattern(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*\s).{8,}$/,
    )
    .messages({
      'any.required': '{{#label}} field is required',
      'string.base': '{{#label}} must be of type string',
      'string.empty': '{{#label}} can not be empty',
      'string.pattern.base':
        '{{#label}} must contain at least 8 characters including at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    }),
});
