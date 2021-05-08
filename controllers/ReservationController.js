// Controller 는 오직 Service 레이어에만 의존합니다.
const { ReservationService } = require('../services');

const makeReservation = async (req, res, next) => {
  try {
    const fields = req.body;
    const newReservation = await ReservationService.makeReservation(fields);

    res.status(200).json({
      message: 'SUCCESS',
      newReservation,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  makeReservation,
};