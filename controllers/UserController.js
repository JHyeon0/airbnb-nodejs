const { AUTH_TOKEN_SALT } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Controller는 오직 Service 레이어에만 의존합니다.
const { UserService } = require('../services');

const signUp = async (req, res, next) => {
  try {
    const {
      email,
      password,
      phoneNumber,
      profileImageUrl,
      introduction,
    } = req.body;

    const REQUIRED_INFO = { email, password, phoneNumber };

    for (let info in REQUIRED_INFO) {
      if (!REQUIRED_INFO[info])
        return res.status(400).json({ message: `MISSING ${info}` });
    }

    const foundUser = await UserService.findUser({ email });
    if (foundUser) return res.status(400).json({ message: 'EXISTING USER' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserService.createUser({
      email,
      password: hashedPassword,
      phoneNumber,
      profileImageUrl,
      introduction,
    });

    res.status(201).json({
      message: 'user created',
      userId: createdUser.id,
    });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const TOKEN_MAINTAINING_HOURS = 24;
    const { email, password: inputPassword } = req.body;

    const foundUser = await UserService.findUser({ email }, ['id', 'password']);

    if (!foundUser)
      return res.status(400).json({ message: 'client input invalid' });

    const { id, password: hashedPassword } = foundUser;
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);

    if (!isValidPassword)
      return res.status(400).json({ message: 'client input invalid' });

    const token = jwt.sign({ id }, AUTH_TOKEN_SALT, {
      expiresIn: `${TOKEN_MAINTAINING_HOURS}h`,
    });
    res.status(200).json({ message: 'SUCCESS', token });
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  try {
    const foundUser = req.foundUser;
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  logIn,
  signUp,
  verify,
};
