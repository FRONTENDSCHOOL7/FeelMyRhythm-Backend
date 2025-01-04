import express from 'express';
import userRepository from './user.Repository.js';
import userController from './controller/user.controller.js';
import userService from './service/user.service.js';
import intercepter from '../../common/exception/http-exception.filter.js';
import upload from '../../multerConfig.js';
import authRepository from '../auth/auth.Repository.js';

const router = express.Router();

// 회원가입
router.post(
  '/emailregister',
  upload.single('image'),
  userRepository.validEmail,
  userController.emailRegister,
  userRepository.hashPassword,
  userService.emailRegister,
  intercepter
);

// 이메일 검증
router.post('/emailvalid', userRepository.validEmail, intercepter);

// 닉네임 검증
router.post('/nicknamevalid', userController.nicknameValid, userService.nicknameValid, intercepter);

// 회원 정보 조회
router.get('/', authRepository.authenticate, userRepository.getUserInfo, intercepter);

export default router;
