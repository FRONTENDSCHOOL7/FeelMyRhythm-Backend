import Post from '../post.Schema.js';

const postService = {};

postService.createPost = async (req, res, next) => {
  try {
    const { title, content, youtubelink, kind } = req.body;

    const newPost = new Post({ title, content, youtubelink, kind });

    await newPost.save();

    req.statusCode = 200;
    req.data = newPost;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
};

export default postService;
