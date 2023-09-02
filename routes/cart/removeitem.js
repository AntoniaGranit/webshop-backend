import express from 'express';
const router = express.Router();
import { Cart } from '../../schemas/cart';
import { User } from '../../schemas/user';
import { Plant } from '../../schemas/plant';
import { authenticateUser } from '../../middleware/auth';

router.delete('/cart/remove/:id', authenticateUser, async (req, res) => {
    try {
      const accessToken = req.header("Authorization");
      const singleUser = await User.findOne({accessToken: accessToken}); // Get the user ID connected to the cart
      // const plantId = await Plant.findById(req.params.id); Get ID of plant user wants to add to cart

      // Find the user's cart
      let cart = await Cart.findOne({ owner: singleUser });
  
      // If the cart doesn't exist, return an error
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the index of the item in the cart
      const itemIndex = cart.items.findIndex(item => item.itemId.equals(req.params.id));
  
      // If the item is in the cart, decrease its quantity or remove it
      if (itemIndex !== -1) {
        const item = cart.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart.items.splice(itemIndex, 1);
        }
        await cart.save();
        await Cart.populate(cart, { path: 'items.itemId' });
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