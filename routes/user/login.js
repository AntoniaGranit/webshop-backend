import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../../schemas/user';

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email })
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          success: true,
          response: {
            email: user.email,
            id: user._id,
            accessToken: user.accessToken,
            message: 'User successfully logged in'
          }
        })
      } else {
        res.status(400).json({
          success: false,
          response: e,
          message: 'Incorrect email or password'
        })
      }
    } catch(e) {
      // 500 database error
      res.status(500).json({
        success: false,
        response: e
      })
    }
  });

  module.exports = router;