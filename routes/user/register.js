import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../../schemas/user';

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
      const salt = bcrypt.genSaltSync();
      const newUser = await new User({
        email: email,
        password: bcrypt.hashSync(password, salt)
      }).save();
      // 201 status code - successful creation of user
      res.status(201).json({
        success: true,
        response: {
          message: 'User successfully registered',
          email: newUser.email,
          id: newUser._id,
          accessToken: newUser.accessToken
        }
      })
    } catch (e) {
      res.status(400).json({
        success: false,
        response: e,
        message: 'Could not register user'
      })
    }
  });

export default router;