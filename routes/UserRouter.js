const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares');

const { UserController } = require('../controllers');
// Route 는 오직 Controller 에만 의존 합니다.

router.post('/login', UserController.logIn);
router.post('/signup', UserController.signUp);
router.get('/verify', [validateToken], UserController.verify);

module.exports = router;
