const express = require('express');
const router = express.Router();

const UserRouter = require('./UserRouter');
const PlaceRouter = require('./PlaceRouter');
const ReservationRouter = require('./ReservationRouter');

router.use('/users', UserRouter); // '/users' 엔드포인트를 처리하기 위해 UserRouter 를 붙여줍니다.
router.use('/places', PlaceRouter);
router.use('/reservations', ReservationRouter);

module.exports = router; // 이렇게 내보낸 router 는 express app 의 미들웨어로 사용됩니다.
