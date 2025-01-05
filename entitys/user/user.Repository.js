import User from './user.Schema.js';
import bcrypt from 'bcryptjs';

const userRepository = {};

// 이메일 검증
userRepository.valid = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { originalUrl } = req;
    const { accountname } = req.body;

    const user = await User.findOne({ accountname });

    if (originalUrl.includes('login')) {
      if (!user) throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
    } else if (user) throw new Error('이미 가입된 이메일입니다.');

    req.user = user;
    req.statusCode = 200;
    req.data = '사용 가능한 이메일 입니다.';
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

userRepository.getUserInfo = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { validTokenId } = req;

    console.log('vato', validTokenId);

    const user = await User.findById(validTokenId);

    console.log('user', user);

    if (!user) throw new Error('회원 정보를 조회할 수 없습니다.');

    req.statusCode = 200;
    req.data = user;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

export default userRepository;
