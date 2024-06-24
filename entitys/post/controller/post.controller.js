const postController = {};

postController.createPost = async (req, res, next) => {
  try {
    const { title, youtubelink, kind } = req.body;

    if (!title) throw new Error('제목이 비어있습니다.');
    if (!youtubelink) throw new Error('영상을 비어있습니다.');
    if (!kind) throw new Error('감정 선택이 비어있습니다.');
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

export default postController;
