import mongoose, { Schema } from "mongoose";

export interface Account {
    name: string;
    description: string;
    amount: number;
    interest: number;
    rate: number;
    loanYears:number;
    created_at: Date;
    updated_at: Date;
}
// This accountSchema is for the db
const accountSchema = new Schema<Account>({
    name:{
        type: String,
        required: true,
        minlength: 2,
        // trim: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
        minlength: 20,
    },
    amount:{
        type: Number,
        required: true,
    },
    interest:{
        type: Number,
        default: 0,
    },
    rate:{
        type: Number,
        required: true,
    },
    loanYears:{
        type: Number,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now, 
    },
    updated_at:{
        type: Date,
        default:Date.now,
    }
});

 const Accounts = mongoose.model('Account', accountSchema);

 export default Accounts;



