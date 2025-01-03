import express from 'express';
import intercepter from '../../common/exception/http-exception.filter.js';
import userRepository from '../user/user.Repository.js';
import authController from './controller/auth.controller.js';
import authService from './service/auth.service.js';

const router = express.Router();

router.post(
  '/emaillogin',
  userRepository.validEmail,
  authController.loginWithEmail,
  authService.loginWithEmail,
  intercepter
);

export default router;
