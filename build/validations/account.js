"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
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
exports.default = {
    AccountSchema,
    DigitSchema
};
