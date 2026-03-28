import express from 'express';
import cors from 'cors';
import uploadRouter from './Routes/upload.routes.js';

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // ✅ frontend URL
}));
app.use(express.json());
app.use('/api', uploadRouter);

export default app;