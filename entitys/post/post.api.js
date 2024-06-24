import express from 'express';
import intercepter from '../../common/exception/http-exception.filter.js';

const router = express.Router();

// 회원가입
router.post('/', userRepository.validEmail, intercepter);

export default router;
