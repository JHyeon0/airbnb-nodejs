const prisma = require('../prisma'); // Service 로직은 오직 Model(=Prisma) 에만 의존합니다.

const findPlace = (fields) => {
  console.log('fields in service: ', fields);

  return prisma.place.findMany({
    where: {
      pricePerDay: { lte: fields.maximumPrice, gte: fields.minimumPrice },
    },
    include: {
      host: {
        select: {
          isCertified: true,
          user: {
            select: {
              username: true,
              email: true,
            },
          },
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
