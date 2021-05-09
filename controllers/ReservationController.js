// Controller 는 오직 Service 레이어에만 의존합니다.
const { ReservationService } = require('../services');

const makeReservation = async (req, res, next) => {
  try {
    const { id: guestId } = req.foundUser;
    const fields = req.body;
    fields.guestId = guestId;
    const newReservation = await ReservationService.makeReservation(fields);

    res.status(200).json({
      message: 'SUCCESS',
      newReservation,
    });
  } catch (err) {
    next(err);
  }
};

const getHostReservations = async (req, res, next) => {
  try {
    console.log(req.foundUser.hostId);
    const hostReservations = await ReservationService.getHostReservations(
      req.foundUser.hostId,
    );

    res.status(200).json({ message: 'SUCCESS', hostReservations });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  makeReservation,
  getHostReservations,
};
