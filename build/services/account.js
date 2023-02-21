"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAccounts = void 0;
const account_1 = __importDefault(require("../models/account"));
const getAllAccounts = async () => {
    //this gets all our accounts and forwarsd them to the main guy
    const records = await account_1.default.find({});
    if (records && records?.length > 0) {
        records.forEach((record) => dailyComInterestFunc({
            _id: record._id,
            principal: record.amount,
            rate: record.rate,
            years: record.loanYears,
        }));
    }
};
exports.getAllAccounts = getAllAccounts;
const dailyComInterestFunc = async (data) => {
    //this is where the main thing happens
    // continue here 20-02-23
    const dailyCompoundInterest = (data.principal * (1 + (data.rate / 365)) ** (data.years * 365)) - data.principal;
    //we update the account with the new amount
    const account = await account_1.default.findOne({ _id: data._id });
    if (account) {
        account.amount = account.amount + dailyCompoundInterest;
        account.interest = dailyCompoundInterest + account.interest;
        await account.save();
        console.log(`Account with the id ${data._id} interest has been completed.....`);
    }
    else {
        console.log(`Account with the id ${data._id} not found or deleted.....`);
    }
};
