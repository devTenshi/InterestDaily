"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../models/account"));
const account_2 = require("../middleware/account");
const router = express_1.default.Router();
// @route - POST, api/accounts/create-account
// @description - this route creates a new account
// @access - public
router.post("/create-account", (0, account_2.validator)("AccountSchema"), async (req, res) => {
    const { name, description, amount, rate, loanYears } = req.body;
    try {
        let account = await account_1.default.findOne({ name });
        if (account)
            return res.status(400).json({
                error: {
                    code: 400,
                    message: "Account already exists",
                },
            });
        account = await account_1.default.create({
            name,
            description,
            amount,
            rate,
            loanYears,
        });
        res.status(201).json({ message: "Success", data: account });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: {
                code: 500,
                message: "Internal Server Error",
            },
        });
    }
});
// @route - GET, api/accounts
// @description - this route get's the existing accounts on db
// @access - public
router.get("/", async (req, res) => {
    try {
        const accounts = await account_1.default.find({}).sort({ created_at: -1 }).lean();
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
    }
    catch (error) {
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
router.put("/", (0, account_2.validator)("DigitSchema"), async (req, res) => {
    if (!req.query.id)
        return res.status(400).json({
            error: {
                code: 400,
                message: "id is required",
            },
        });
    try {
        const account = await account_1.default.findById(req.query.id);
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: {
                code: 500,
                message: "Internal Server Error",
            },
        });
    }
});
// @route - DELETE, api/accounts
// @description - this route deletes a single account
// @access - public
router.delete("/", async (req, res) => {
    if (!req.query.id)
        return res.status(400).json({
            error: {
                code: 400,
                message: "id is required",
            },
        });
    try {
        const account = await account_1.default.findById(req.query.id);
        if (!account)
            return res.status(400).json({
                error: {
                    code: 400,
                    message: "This account does not exist or has been deleted",
                },
            });
        await account.remove();
        res.status(201).json({ message: "Success", data: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: {
                code: 500,
                message: "Internal Server Error",
            },
        });
    }
});
exports.default = router;
