import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authRepository = {};

authRepository.authenticate = async (req, res, next) => {
  try {
    const token = req.cookies['token'];
    let result = '';

    if (!token) throw new Error('토큰이 유효하지 않습니다.');

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        throw new Error('토큰이 유효하지 않습니다.');
      } else {
        result = payload._id;
      }
    });

    req.validTokenId = result;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

export default authRepository;
