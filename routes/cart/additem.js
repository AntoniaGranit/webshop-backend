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
  
      // Check if there's already an item with the same ID in the cart
      const existingItem = cart.items.find(item => item.itemId.equals(req.params.id));
      if (existingItem) {
        existingItem.quantity += 1; // increase quantity of item by one if it's already in the cart
      } else {
        cart.items.push({ itemId: plantId }); // using the push array method, add the item to the cart array
      }
      await cart.save(); // save the cart
      await Cart.populate(cart, { path: 'items.itemId' }); // include detailed plant information in the response
      res.json(cart); // the response with the updated cart
    } catch (error) {
      console.error('Error: Something went wrong!', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
