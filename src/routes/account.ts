import express, { Request, Response } from "express";
import Accts from "../models/account";
import { validator } from "../middleware/account";
const router = express.Router();

// @route - POST, api/accounts/create-account
// @description - this route creates a new account
// @access - public
router.post(
  "/create-account",
  validator("AccountSchema"),
  async (req: Request, res: Response) => {
    const { name, description, amount, rate, loanYears } = req.body;
    try {
      let account = await Accts.findOne({ name });
      if (account)
        return res.status(400).json({
          error: {
            code: 400,
            message: "Account already exists",
          },
        });
      account = await Accts.create({
        name,
        description,
        amount,
        rate,
        loanYears,
      });
      res.status(201).json({ message: "Success", data: account });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    }
  }
);

// @route - GET, api/accounts
// @description - this route get's the existing accounts on db
// @access - public

router.get("/", async (req: Request, res: Response) => {
  try {
    const accounts = await Accts.find({}).sort({ created_at: -1 }).lean();
    if (accounts.length === 0)
      return res.status(400).json({
        error: {
          code: 400,
          message: "Empty accounts",
        },
      });
    if (!accounts)
      return res.status(400).json({
        error: {
          code: 400,
          message: "Accounts not found",
        },
      });

    res.status(201).json({ message: "Success", data: accounts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        code: 500,
        message: "Internal Server Error",
      },
    });
  }
});

// @route - PUT, api/accounts/edit-account
// @description - this route edits a account amount,rate and LoanYears
// @access - public

//http://localhost:8000/api/accounts?id=12
router.put(
  "/",
  validator("DigitSchema"),
  async (req: Request, res: Response) => {
    if (!req.query.id)
      return res.status(400).json({
        error: {
          code: 400,
          message: "id is required",
        },
      });
    try {
      const account = await Accts.findById(req.query.id);
      if (!account)
        return res.status(400).json({
          error: {
            code: 400,
            message: "This account does not exist or has been deleted",
          },
        });
      account.amount = req.body.amount;
      account.rate = req.body.rate;
      account.loanYears = req.body.loanYears;
      await account.save();
      res.status(201).json({ message: "Success", data: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: {
          code: 500,
          message: "Internal Server Error",
        },
      });
    }
  }
);

// @route - DELETE, api/accounts
// @description - this route deletes a single account
// @access - public

router.delete("/", async (req: Request, res: Response) => {
  if (!req.query.id)
    return res.status(400).json({
      error: {
        code: 400,
        message: "id is required",
      },
    });
  try {
    const account = await Accts.findById(req.query.id);
    if (!account)
      return res.status(400).json({
        error: {
          code: 400,
          message: "This account does not exist or has been deleted",
        },
      });
    await account.remove();
    res.status(201).json({ message: "Success", data: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: {
        code: 500,
        message: "Internal Server Error",
      },
    });
  }
});

export default router;
