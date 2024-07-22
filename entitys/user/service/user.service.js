import User from "../user.Schema.js";

const userService = {};

// 회원가입
userService.emailRegister = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { hashPassword } = req;
    const { email, name, kind = "emailuser" } = req.body;
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

// 닉네임 검증
userService.nicknameValid = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { nickname } = req.body;

    const valid = await User.findOne({ nickname });

    if (valid) {
      throw new Error("이미 존재하는 닉네임입니다.");
    }

    req.statusCode = 200;
    req.data = "ok";
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

export default userService;
