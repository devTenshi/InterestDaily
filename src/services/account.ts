import Accts from "../models/account";
import { Types } from "mongoose";

type Data = {
  _id: Types.ObjectId;
  principal: number;
  rate: number;
  years: number;
};

export const getAllAccounts = async () => {
  //this gets all our accounts and forwarsd them to the main guy
  const records = await Accts.find({});
  if (records && records?.length > 0) {
    records.forEach((record) =>
    dailyComInterestFunc({
        _id: record._id,
        principal: record.amount,
        rate: record.rate,
        years: record.loanYears,
      })
    );
  }
};

const dailyComInterestFunc = async (data:Data) => {
  //this is where the main thing happens
  // continue here 21-02-23
 const dailyCompoundInterest = (data.principal * (1 + (data.rate / 365)) ** (data.years*365))-data.principal;
  //we update the account with the new amount
  const account = await Accts.findOne({_id: data._id});
  if(account) {
    account.amount = account.amount + dailyCompoundInterest;
    account.interest = dailyCompoundInterest + account.interest;
    await account.save();
    console.log(`Account with the id ${data._id} interest has been completed.....`)
  }else {
    console.log(`Account with the id ${data._id} not found or deleted.....`)
  }
};
