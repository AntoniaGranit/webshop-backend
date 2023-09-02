import express from 'express';
const router = express.Router();
import { Cart } from '../../schemas/cart';
import { User } from '../../schemas/user';
import { Plant } from '../../schemas/plant';
import { authenticateUser } from '../../middleware/auth';

router.post('/cart/add/:id', authenticateUser, async (req, res) => {
    try {
      const accessToken = req.header("Authorization");
      const singleUser = await User.findOne({accessToken: accessToken}); // Get the user ID connected to the cart
      const plantId = await Plant.findById(req.params.id); // Get ID of plant user wants to add to cart
      console.log('Debug: Plant ID:', req.params.id);
      const plant = await Plant.findById(plantId);
      if (!plant) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      // Find the user's cart
      let cart = await Cart.findOne({ owner: singleUser });
  
      // If the cart doesn't exist, create a new one
      if (!cart) {
        cart = new Cart({ owner: singleUser, items: [] });
      }
  
      // Check if the item is already in the cart
      const existingItem = cart.items.find(item => item.itemId.equals(req.params.id));
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity of item if already in cart
      } else {
        cart.items.push({ itemId: plantId }); // Add item to the cart if not
      }
      await cart.save();
      await Cart.populate(cart, { path: 'items.itemId' });
      res.json(cart);
    } catch (error) {
      console.error('Error: Something went wrong!', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
