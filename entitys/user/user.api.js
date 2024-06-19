import express from 'express';
import userRepository from './user.Repository';
import userController from './controller/user.controller';
import userService from './service/user.service';

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

export default router;
