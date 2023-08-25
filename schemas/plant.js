import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
    id: {
      type: Number
    },
    latinname: {
      type: String,
      required: true
    },
    size: {
      type: String,
      enum: ['big', 'small'],
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

module.exports = mongoose.model('Plant', PlantSchema);