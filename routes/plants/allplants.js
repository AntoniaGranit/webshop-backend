import express from 'express';
const router = express.Router();
import { Plant } from '../../schemas/plant';

// Get all plants
router.get("/plants", async (req, res) => {
    try {
      const allPlants = await Plant.find({});
      const response = {
        success: true,
        message: 'All products',
        body: allPlants
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