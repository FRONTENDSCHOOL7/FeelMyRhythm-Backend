import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema({
  title: { type: String, required: true },
  content: { type: String },
  youtubelink: { type: String, required: true },
  kind: { type: String, required: true },
});

postSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};

const Post = mongoose.model('Post', postSchema);

export default Post;
