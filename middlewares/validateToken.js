const { UserService } = require('../services');
const { AUTH_TOKEN_SALT } = process.env;
const jwt = require('jsonwebtoken');

// req.foundUser = { id: number } 생성
const validateUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'LOGIN_REQUIRED' });
    }
    if (req.headers.authorization?.split(' ').length !== 2)
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

// req.foundUser = { id: number , isHost: boolean } 생성
const validateHost = async (req, res, next) => {
  try {
    /* validateUser 로직 겹치는 부분: 시작 */
    if (req.headers.authorization?.split(' ').length !== 2)
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

    const foundUser = await UserService.findUser({ id: decoded.id }, ['id']);

    if (!foundUser) return res.status(404).json({ message: 'user not found' });
    /* validateUser 로직 겹치는 부분: 끝, 함수로 분리하는 방법? */

    foundUser.hostId = await UserService.verifyHost(foundUser.id);

    if (!foundUser.hostId)
      return res.status(403).json({ message: 'unauthorized host' });

    req.foundUser = foundUser;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateUser,
  validateHost,
};
