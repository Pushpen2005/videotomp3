import express from 'express';
import cors from 'cors';
import uploadRouter from './Routes/upload.routes.js';

const app = express();
app.use(
  cors({
    origin: [
      "https://videotomp3-gwji.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', uploadRouter);

export default app;