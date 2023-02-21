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
        records.forEach((record) => dailyCompountInterest(record._id));
    }
};
exports.getAllAccounts = getAllAccounts;
const dailyCompountInterest = (_id) => {
    //this is where the main thing happens
    // we continue here
};
