const { UserService } = require('../services');
const { AUTH_TOKEN_SALT } = process.env;
const jwt = require('jsonwebtoken');

// req.foundUser = { id: number } 생성
const validateUser = async (req, res, next) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    const [bearer, token] = tokenWithBearer.split(' ');
    if (!tokenWithBearer)
      return res.status(401).json({ message: 'LOGIN_REQUIRED' });

    if (!token)
      return res
        .status(401)
        .json({ message: 'INVALID_AUTHORIZATION_FORMAT [bearer token]' });

    const decodedResult = await jwt.verify(
      token,
      AUTH_TOKEN_SALT,
      (err, decoded) => decoded || err,
    );

    if (!decodedResult.id) {
      const e = new Error(decodedResult);
      e.status = 401;
      throw e;
    }

    const foundUser = await UserService.findUser({ id: decoded.id }, ['id']);

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
    const tokenWithBearer = req.headers.authorization;
    const [bearer, token] = tokenWithBearer.split(' ');
    if (!tokenWithBearer)
      return res.status(401).json({ message: 'LOGIN_REQUIRED' });

    if (!token)
      return res
        .status(401)
        .json({ message: 'INVALID_AUTHORIZATION_FORMAT [bearer token]' });

    const decodedResult = await jwt.verify(
      token,
      AUTH_TOKEN_SALT,
      (err, decoded) => decoded || err,
    );

    if (!decodedResult.id) {
      const e = new Error(decodedResult);
      e.status = 401;
      throw e;
    }

    const foundUser = await UserService.findUser({ id: decodedResult.id }, [
      'id',
    ]);

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
