import * as Joi from "joi";

// This accountSchema is for validation purposes
 const AccountSchema = Joi.object().keys({
  name: Joi.string().min(2).max(30).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required field`,
  }),
  description: Joi.string().min(20).max(250).required().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.empty": `"description" cannot be an empty field`,
    "string.min": `"description" should have a minimum length of {#limit}`,
    "any.required": `"description" is a required field`,
  }),
  amount: Joi.number().integer().min(100).precision(2).required().messages({
    "number.min": "Amount must be at least 3 digits",
  }),
  rate: Joi.number().integer().min(1).required().messages({
    "number.min": "Rate must be  at least 1 digit",
  }),
  loanYears: Joi.number().integer().min(1).required().messages({
    "number.min": "LoanYears must be  at least 1 digit",
  }),
});

// This DigitSchema is spec. for Amount,Rate and loanYears alone.
const DigitSchema = Joi.object()
  .keys({
    amount: Joi.number().integer().min(100).precision(2).required().messages({
      "number.min": "Amount must be 3 digits",
    }),
    rate: Joi.number().integer().min(1).required().messages({
    "number.min": "Rate must be  at least 1 digit",
  }),
  loanYears: Joi.number().integer().min(1).required().messages({
    "number.min": "LoanYears must be  at least 1 digit",
  }),
  });


export default {
  AccountSchema,
  DigitSchema
}
