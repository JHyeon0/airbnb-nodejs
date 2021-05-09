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

const findOnePlace = (placeId) => {
  return prisma.place.findUnique({
    where: {
      id: placeId,
    },
    select: {
      id: true,
      title: true,
      beds: true,
      bathrooms: true,
      conveniences: true,
      pricePerDay: true,
      maximumGuests: true,
      locationLogitude: true,
      locationLatitude: true,
      rules: true,
      host: {
        select: {
          user: { select: { username: true } },
        },
      },
      placeImage: { select: { id: true, imageUrl: true } },
    },
  });
};

const findOnePlaceDetail = (placeId) => {
  return prisma.place.findUnique({
    where: {
      id: placeId,
    },
    include: {
      host: {
        select: {
          user: { select: { username: true } },
        },
      },
      placeImage: { select: { id: true, imageUrl: true } },
    },
  });
};

module.exports = {
  findPlace,
  findOnePlace,
  findOnePlaceDetail,
};
