import crypto from "crypto";
import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error('Invalid email address');
        }
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 6
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex")
    }
  });

export const User = mongoose.model('User', UserSchema);