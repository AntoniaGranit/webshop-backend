import express from 'express';
const router = express.Router();
import { Cart } from '../../schemas/cart';
import { Plant } from '../../schemas/plant';

router.post('/cart/add/:plantId', async (req, res) => {
    try {
      const userId = req.user._id; // Get the user ID connected to the cart
      const plantId = req.params.plantId; // Get ID of plant user wants to add to cart
  
      // Check if the plant item exists
      const plant = await Plant.findById(plantId);
      if (!plant) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      // Find the user's cart
      let cart = await Cart.findOne({ owner: userId });
  
      // If the cart doesn't exist, create a new one
      if (!cart) {
        cart = new Cart({ owner: userId, items: [] });
      }
  
      // Check if the item is already in the cart
      const existingItem = cart.items.find(item => item.plantItem.toString() === plantId);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity of item if already in cart
      } else {
        cart.items.push({ plantItem: plantId }); // Add item to the cart if not
      }
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
