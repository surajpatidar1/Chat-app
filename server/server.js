import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { db } from './config.js';
import { userRouter } from './routes/UserR.js';
import './controller/Userdetails.js';
import { setupSocket } from './socket/index.js';

dotenv.config();

const app = express();

// Apply middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/Talksy/user", userRouter);

// Create HTTP server from app
const httpServer = setupSocket(app);

db().then(() => httpServer.listen(1000, () => {
  console.log("server started..*");
})).catch(console.error);
