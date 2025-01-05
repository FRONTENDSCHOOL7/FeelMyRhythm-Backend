import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const Schema = mongoose.Schema;

const userSchema = Schema({
  accountname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  intro: { type: String },
  kind: { type: String },
  image: { type: String },
  isfollow: { type: Boolean },
  following: { type: [String], default: [] },
  follower: { type: [String], default: [] },
  followerCount: { type: Number, default: 0 },
  foloowerCount: { type: Number, default: 0 },
});

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY);
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
