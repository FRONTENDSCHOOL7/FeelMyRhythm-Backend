import User from './user.Schema.js';
import bcrypt from 'bcryptjs';

const userRepository = {};

// 이메일 검증
userRepository.validEmail = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('이미 가입된 이메일 주소입니다.');
    }

    req.user = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

// 비밀번호 암호화
userRepository.hashPassword = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    req.hashPassword = hash;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

export default userRepository;
