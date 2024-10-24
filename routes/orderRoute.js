import express from "express";
import {requireSignIn,isAdmin} from '../middlewares/authMiddelware.js'
import {confirmOrder} from "../controllers/orderController.js";

const router = express.Router();
// Route for confirming an order
router.post('/confirm',requireSignIn,isAdmin, confirmOrder);

export default router; // Use default export

