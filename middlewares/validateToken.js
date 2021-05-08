const { UserService } = require('../services');
const { AUTH_TOKEN_SALT } = process.env;
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    if (req.headers.authorization.split(' ').length !== 2)
      return res
        .status(401)
        .json({ message: 'invalid authorization format [bearer token]' });

    const [bearer, token] = req.headers.authorization.split(' ');
    const decoded = await jwt.verify(token, AUTH_TOKEN_SALT, (err, decoded) => {
      if (!decoded) {
        res.status(401).json(err);
        return;
      }
      return decoded;
    });
    if (!decoded) return;

    const foundUser = await UserService.findUser({ id: decoded.id });

    if (!foundUser) return res.status(404).json({ message: 'user not found' });

    req.foundUser = foundUser; // request 객체에 새로운 키값에 찾아진 유저의 정보를 할당
    next(); // next() 함수로 다음 미들웨어로 맥락(context)를 연결
  } catch (err) {
    next(err);
  }
};

module.exports = validateToken;