const { AUTH_TOKEN_SALT } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Controller 는 오직 Service 레이어에만 의존합니다.
const { UserService } = require('../services');

// 아래 정의된 함수는 지난 수업시간에 다룬 내용 입니다.
const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserService.findUser({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserService.createUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'user created',
      user_id: createdUser.id,
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password: inputPassword } = req.body;

    const foundUser = await UserService.findUser({ email });

    const { id, password: hashedPassword } = foundUser;
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);

    const token = jwt.sign({ id }, AUTH_TOKEN_SALT, { expiresIn: '1h' });
    res.status(200).json({ message: 'login success!', token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  logIn,
  signUp,
};
