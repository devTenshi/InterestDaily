import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import AccountRoutes from "./routes/account";
import { getAllAccounts } from "./services/account";
const cron = require("node-cron");

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT;
// app.use(express.json({ extended: false }))
app.use(express.json({ extended: false } as any));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});


//for all the routes in accounts
app.use("/api/accounts", AccountRoutes);

// wildcard routes
//for all routes that do not exist
app.get('*', (req: Request, res: Response) => {
  return res.status(400).json({
    error: {
      code: 400,
      message: `Cannot get ${req.originalUrl}... it doesn't exist`,
    },
  });
})

cron.schedule('* * * * *', () => {
  // console.log('running a task every minute');
  getAllAccounts();
  //this is where we would call that get all tasks functionality
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

