import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
    latinname: {
      type: String,
      required: true
    },
    size: {
      type: String,
      enum: ['big', 'medium', 'small'],
      required: true
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

export const Plant = mongoose.model('Plant', PlantSchema);