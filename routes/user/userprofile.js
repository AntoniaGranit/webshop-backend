import express from 'express';
const router = express.Router();
import { User } from '../../schemas/user';
import { authenticateUser } from '../../middleware/auth';

// Get user profile
router.get("/users/:id", authenticateUser, async (req, res) => {
    try {
      const singleUser = await User.findById(req.params.id);
      if (!singleUser) {
        return res.status(404).json({
          success: false,
          body: {
            message: 'User not found'
          }
        })
      }
      const userEmail = singleUser.email;
      const response = {
        success: true,
        message: `User profile for user with the email ${userEmail}`,
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