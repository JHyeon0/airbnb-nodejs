const prisma = require('../prisma'); // Service 로직은 오직 Model(=Prisma) 에만 의존합니다.

const findPlace = (fields) => {
  return prisma.place.findMany({
    where: {
      pricePerDay: { lte: fields.maximumPrice, gte: fields.minimumPrice },
    },
    select: {
      id: true,
      title: true,
      beds: true,
      bathrooms: true,
      conveniences: true,
      pricePerDay: true,
      maximumGuests: true,
      host: {
        select: {
          user: { select: { username: true } },
        },
      },
      placeType: { select: { name: true } },
      placeImage: { select: { imageUrl: true } },
      _count: { select: { review: true } },
    },
  });
};

module.exports = {
  findPlace,
};
