import mongoose from 'mongoose';

const ObjectID = mongoose.Schema.Types.ObjectId;

const CartSchema = new mongoose.Schema({
    user: {
      type: ObjectID,
      required: true,
      ref: 'User'
    },
    items: [
        {
            plantItem: {
                type: ObjectID,
                required: true,
                ref: 'Plant'
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
  });

export const Cart = mongoose.model('Cart', CartSchema);