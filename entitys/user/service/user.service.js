import User from '../user.Schema.js';

const userService = {};

// 회원가입
userService.emailRegister = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { hashPassword } = req;
    const { email, name, kind = 'emailuser' } = req.body;
    const image = req.file.location;

    const newUser = new User({ email, password: hashPassword, name, kind, profileImage: image });

    await newUser.save();

    req.statusCode = 200;
    req.data = newUser;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

export default userService;
