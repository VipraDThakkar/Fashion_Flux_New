// routes/imageRoutes.js
import express from 'express';
import { compareImage } from '../controllers/imageController.js'; // Import controller functions
import {upload} from '../middlewares/uploadMiddleware.js'; // Image upload middleware

const router = express.Router();

// Route for uploading and comparing images
router.post('/compare', upload.single('image'), compareImage);

export default router;
