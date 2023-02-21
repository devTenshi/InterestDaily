"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const account_1 = __importDefault(require("../validations/account"));
const createHttpError = require("http-errors");
const validator = (validator) => {
    //! If validator is not exist, throw err
    if (!account_1.default.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`);
    return async function (req, res, next) {
        try {
            const validated = await account_1.default[validator].validateAsync(req.body);
            req.body = validated;
            next();
        }
        catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if (err.isJoi) {
                res.status(422).send(err.details[0].message);
                return next(createHttpError(422, { message: err.message }));
            }
            next(createHttpError(500));
        }
    };
};
exports.validator = validator;
