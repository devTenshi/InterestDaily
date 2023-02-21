"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        await mongoose_1.default.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected..");
    }
    catch (err) {
        console.log(err?.message);
        // kills the running application
        process.exit(1);
    }
};
exports.default = connectDB;
