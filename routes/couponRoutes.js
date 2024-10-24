import express from 'express';
import { createCoupon, updateCoupon, deleteCoupon, applyCoupon ,getCoupons,getLatestCoupon} from '../controllers/couponController.js';
import {requireSignIn,isAdmin} from '../middlewares/authMiddelware.js'

const router = express.Router();


// Admin routes for managing coupons
router.post('/', requireSignIn,isAdmin, createCoupon);          // POST /api/v1/coupon/  - Create a new coupon
router.put('/:id',requireSignIn, isAdmin, updateCoupon);        // PUT /api/v1/coupon/:id  - Update a coupon by ID
router.delete('/:id', requireSignIn,isAdmin, deleteCoupon);     // DELETE /api/v1/coupon/:id  - Delete a coupon by ID

// Public route for applying a coupon
router.get('/apply/:code',requireSignIn, applyCoupon);          // GET /api/v1/coupon/apply/:code  - Apply a coupon by code

//get all coupens
router.get('/',requireSignIn,isAdmin, getCoupons); // GET /api/v1/coupon/
//get one coupen
router.get('/:id', requireSignIn,isAdmin,getLatestCoupon);

export default router;
