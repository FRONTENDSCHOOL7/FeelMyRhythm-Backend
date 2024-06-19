import express from 'express';
import userRepository from './user.Repository.js';
import userController from './controller/user.controller.js';
import userService from './service/user.service.js';
import intercepter from '../../common/exception/http-exception.filter.js';

const router = express.Router();

// 회원가입
router.post(
  '/emailregister',
  userRepository.validEmail,
  userController.emailRegister,
  userRepository.hashPassword,
  userService.emailRegister,
  intercepter
);

// 이메일 검증
router.post('/emailvalid', userRepository.validEmail, intercepter);

export default router;
