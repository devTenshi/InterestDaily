"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const account_1 = __importDefault(require("./routes/account"));
const account_2 = require("./services/account");
const cron = require("node-cron");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.use(express.json({ extended: false }))
app.use(express_1.default.json({ extended: false }));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server is running");
});
//for all the routes in accounts
app.use("/api/accounts", account_1.default);
// wildcard routes
//for all routes that do not exist
app.get('*', (req, res) => {
    return res.status(400).json({
        error: {
            code: 400,
            message: `Cannot get ${req.originalUrl}... it doesn't exist`,
        },
    });
});
cron.schedule('* * * * *', () => {
    // console.log('running a task every minute');
    (0, account_2.getAllAccounts)();
    //this is where we would call that get all tasks functionality
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
