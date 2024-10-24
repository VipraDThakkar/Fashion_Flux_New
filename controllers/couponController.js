import Coupon from '../models/coupenModel.js';

// Create a new coupon
export const createCoupon = async (req, res) => {
    try {
      const couponData = req.body;
      const newCoupon = new Coupon(couponData);
      await newCoupon.save();
  
      // Send a successful response with the new coupon data
      res.status(201).json({
        success: true,
        message: 'Coupon created successfully',
        data: newCoupon,
      });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({
        success: false,
        message: 'Failed to create coupon',
        error: err.message, // Optionally send the error message for debugging
      });
    }
  };
  
// Update a coupon
export const updateCoupon = async (req, res) => {
  const { id } = req.params; // Make sure you are accessing the id correctly

  if (!id) {
    return res.status(400).json({ success: false, message: 'Coupon ID is missing' });
  }

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCoupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    res.status(200).json({ success: true, coupon: updatedCoupon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update coupon' });
  }
};

  
// Delete a coupon

export const deleteCoupon = async (req, res) => {
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!deletedCoupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.status(204).send(); // Successfully deleted, no content to return
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete coupon' });
    }
  };
  
//get all coupens
export const getCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find(); // Fetch all coupons from the database
      res.status(200).json({ success: true, coupons }); // Return the coupons in the response
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch coupons' });
    }
  };
  //get single coupen
 
  export const getLatestCoupon = async (req, res) => {
    try {
      const coupon = await Coupon.findOne().sort({ createdAt: -1 }).select('_id'); // Find the latest coupon and return only its ID
      if (coupon) {
        res.status(200).json({ success: true, coupon });
      } else {
        res.status(404).json({ success: false, message: 'Coupon not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch coupon' });
    }
  };
  

// Apply a coupon

// export const applyCoupon = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const coupon = await Coupon.findOne({ code });

//     // Check if the coupon exists
//     if (!coupon) return res.status(404).json({ error: 'Coupon not found' });

//     // Check if the coupon is active
//     if (coupon.status !== 'active') return res.status(400).json({ error: 'Coupon is inactive' });

//     // Check if the coupon is expired
//     if (new Date() > coupon.expiration_date) return res.status(400).json({ error: 'Coupon expired' });

//     // Check if the usage limit has been reached
//     if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
//       return res.status(400).json({ error: 'Coupon usage limit reached' });
//     }

//     // Increment the used_count
//     coupon.used_count += 1;

//     // Save the updated coupon
//     await coupon.save();

//     // Return the applied coupon
//     res.json({ success: true, coupon });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to apply coupon' });
//   }
// };
// export const applyCoupon = async (req, res) => {
//   try {
//     const { code } = req.params;

//     // Find the coupon by the provided code
//     const coupon = await Coupon.findOne({ code });

//     // Check if the coupon exists
//     if (!coupon) {
//       return res.status(404).json({ error: 'Coupon not found' });
//     }

//     // Check if the coupon is active
//     if (coupon.status !== 'active') {
//       return res.status(400).json({ error: 'Coupon is inactive' });
//     }

//     // Check if the coupon is expired
//     const currentDate = new Date();
//     if (currentDate > coupon.expiration_date) {
//       return res.status(400).json({ error: 'Coupon expired' });
//     }

//     // Check if the usage limit has been reached
//     if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
//       return res.status(400).json({ error: 'Coupon usage limit reached' });
//     }

//     // Atomically increment the used_count to prevent race conditions
//     coupon.used_count += 1;

//     // Save the updated coupon usage count
//     await coupon.save();

//     // Respond with the coupon details and discount info
//     res.status(200).json({
//       success: true,
//       message: 'Coupon applied successfully',
//       discountPercentage: coupon.discount_percentage, // Assuming there's a discount percentage field
//       expiration_date: coupon.expiration_date,
//       code: coupon.code,
//     });
//   } catch (err) {
//     console.error("Error applying coupon:", err);
//     res.status(500).json({ error: 'Failed to apply coupon' });
//   }
// };


export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await Coupon.findOne({ code });

    // Check if the coupon exists
    if (!coupon) return res.status(404).json({ error: 'Coupon not found' });

    // Check if the coupon is active
    if (coupon.status !== 'active') return res.status(400).json({ error: 'Coupon is inactive' });

    // Check if the coupon is expired
    if (new Date() > coupon.expiration_date) return res.status(400).json({ error: 'Coupon expired' });

    // Check if the usage limit has been reached
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return res.status(400).json({ error: 'Coupon usage limit reached' });
    }

    // Increment the used_count
    coupon.used_count += 1;

    // Save the updated coupon
    await coupon.save();

    // Return the applied coupon with discount details
    res.json({ 
      success: true, 
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply coupon' });
  }
};
