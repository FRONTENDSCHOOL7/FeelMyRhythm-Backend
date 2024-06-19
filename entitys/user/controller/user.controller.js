import User from '../user.Schema';

const userController = {};

// 이메일 회원가입
userController.emailRegister = async (req, res, next) => {
  try {
    const { name, email, password, passwordCheck } = req.body;

    // 비밀번호 유효성 검사, 이름 유효성 검사, 이메일 유효성 검사 추가 예정

    if (password !== checkPassword) throw new Error('비밀번호 확인이 일치하지 않습니다.');
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};
export default userController;
