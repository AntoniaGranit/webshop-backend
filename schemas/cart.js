import mongoose from 'mongoose';

const ObjectID = mongoose.Schema.Types.ObjectId;

const CartSchema = new mongoose.Schema({
    owner: {
      type: ObjectID,
      required: true,
      ref: 'User' // References the user model
    },
    items: [
        {
            itemId: {
                type: ObjectID,
                required: true,
                ref: 'Plant' // References the Plant model
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            }
        }
    ]
  });

export const Cart = mongoose.model('Cart', CartSchema);