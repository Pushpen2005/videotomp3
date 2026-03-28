import { Router } from "express";
import multer from "multer"
import { uploadFile, downloadFile } from "../Controllers/upload.controller.js";
const upload = multer({ dest: 'uploads/' })

const uploadRouter = Router();
uploadRouter.post('/upload', upload.single('video'), uploadFile);
uploadRouter.get('/download/:filename', downloadFile);  


export default uploadRouter;