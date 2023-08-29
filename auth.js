import { User } from './schemas/user';

// Authenticate user
export const authenticateUser = async (req, res, next) => {
    const accessToken = req.header('Authorization');
    try {
      const user = await User.findOne({accessToken: accessToken});
      if (user) {
        next();
      } else {
        res.status(401).json({
          success: false,
          response: 'Please log in'
        })
      } 
    } catch (e) {
      res.status(500).json({
        success: false,
        message: 'Could not authenticate user',
        response: e
      })
    }
  };
