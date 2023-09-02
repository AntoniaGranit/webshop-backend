import express from 'express';
const router = express.Router();
import { Cart } from '../../schemas/cart';
import { User } from '../../schemas/user';
import { authenticateUser } from '../../middleware/auth';

router.delete('/cart/remove/:id', authenticateUser, async (req, res) => {
    try {
      const accessToken = req.header("Authorization");
      const singleUser = await User.findOne({accessToken: accessToken}); // Get the user ID connected to the cart

      // Find the user's cart
      let cart = await Cart.findOne({ owner: singleUser });
  
      // If the cart doesn't exist, return an error
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the "first occurence" of an item in the cart with matching ID to the one user wants to remove
      const itemIndex = cart.items.findIndex(item => item.itemId.equals(req.params.id));
  
      if (itemIndex > -1) { // if the index of the item is 0 or greater, meaning it exists in the cart array
        const item = cart.items[itemIndex]; // get the item from the cart array
        if (item.quantity > 1) { // if the quantity is greater than 1
          item.quantity -= 1; // decreate the quantity of this item by 1
        } else { // otherwise
          cart.items.splice(itemIndex, 1); // remove the item from the cart array entirely
        }
        await cart.save(); // save the updated cart to the database
        await Cart.populate(cart, { path: 'items.itemId' }); // include detailed plant information in the response
        res.json(cart); // the response with the updated cart
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;