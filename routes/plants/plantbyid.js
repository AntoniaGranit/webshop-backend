import express from 'express';
const router = express.Router();
import { Plant } from '../../schemas/plant';

// Get all plants
router.get("/plants/:id", async (req, res) => {
    try {
      const singlePlant = await Plant.findById(req.params.id);
      const response = {
        success: true,
        message: 'Single plant',
        body: singlePlant
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