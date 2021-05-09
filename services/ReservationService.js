const prisma = require('../prisma'); // Service 로직은 오직 Model(=Prisma) 에만 의존합니다.

const makeReservation = async (fields) => {
  return await prisma.reservation.create({
    data: fields,
  });
};

module.exports = {
  makeReservation,
};
