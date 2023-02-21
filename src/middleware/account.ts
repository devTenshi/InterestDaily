import Validators from "../validations/account";
import { Request, Response, NextFunction } from "express";
const createHttpError = require("http-errors");

export const validator = (validator: string) => {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await Validators[
        validator as keyof typeof Validators
      ].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err: any) {
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
