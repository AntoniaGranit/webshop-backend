import express from 'express';
import { Plant } from '../../schemas/plant';

const router = express.Router();

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

export default router;