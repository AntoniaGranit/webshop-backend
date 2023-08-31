import express from 'express';
const router = express.Router();
import { Cart } from '../../schemas/cart';
import { User } from '../../schemas/user';
import { authenticateUser } from '../../auth';

// Get plant by user id
router.get("/cart", authenticateUser, async (req, res) => {
    try {
      const singleUser = await User.findById(req.params.id);
      const userCart = await Cart.findOne({ owner: singleUser });
      if (!userCart) {
        return res.status(404).json({ 
          message: 'Cart is empty',
          success: false 
        });
      }
      const response = {
        success: true,
        message: 'User cart',
        body: userCart
      };
      res.status(200).json(response);
    } catch (e) {
      console.error('Error:', e);
      res.status(500).json({
        success: false,
        body: {
          message: e,
        },
      });
    }
  });

module.exports = router;