import express from 'express';
const router = express.Router();
import { User } from '../../schemas/user';

// Get user profile
router.get("/users/:id", async (req, res) => {
    try {
      const singleUser = await User.findById(req.params.id);
      const response = {
        success: true,
        message: 'User profile',
        body: singleUser
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