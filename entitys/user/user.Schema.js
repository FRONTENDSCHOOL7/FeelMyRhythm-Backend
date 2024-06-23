import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  kind: { type: String, default: 'emailuser' },
  image: { type: String, default: 'none' },
  follwing: { type: Array, default: [] },
  follower: { type: Array, default: [] },
  followerCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
});

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;
