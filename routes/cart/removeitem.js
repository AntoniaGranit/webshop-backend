import express from 'express';
const router = express.Router();
import { Cart } from '../../schemas/cart';

router.delete('/cart/remove/:plantId', async (req, res) => {
    try {
      const userId = req.user._id;
      const plantId = req.params.plantId;
  
      // Find the user's cart
      let cart = await Cart.findOne({ owner: userId });
  
      // If the cart doesn't exist, return an error
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the index of the item in the cart
      const plantIndex = cart.items.findIndex(item => item.plantItem.toString() === plantId);
  
      // If the plant is in the cart, remove it
      if (plantIndex !== -1) {
        cart.items.splice(plantIndex, 1);
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;