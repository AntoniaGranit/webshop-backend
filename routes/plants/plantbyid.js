import express from 'express';
const router = express.Router();
import { Plant } from '../../schemas/plant';

// Get plant by id
router.get("/plants/:id", async (req, res) => {
    try {
      const singlePlant = await Plant.findById(req.params.id);
      if (!singlePlant) {
        return res.status(404).json({
          success: false,
          body: {
            message: 'Plant not found'
          }
        })
      }
      const plantName = singlePlant.latinname;
      const response = {
        success: true,
        message: `Information about the ${plantName}`,
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