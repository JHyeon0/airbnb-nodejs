// Controller 는 오직 Service 레이어에만 의존합니다.
const { PlaceService } = require('../services');

const placeList = async (req, res, next) => {
  try {
    const fields = req.body;
    const places = await PlaceService.findPlace(fields);

    place_list = [];

    places.forEach((place) =>
      place_list.push({
        id: place.id,
        title: place.title,
        placeTypeName: place.placeType.name,
        conviniences: place.conveniences,
        pricePerNight: place.pricePerDay,
        maximumGuest: place.maximumGuests,
        beds: place.beds,
        bathrooms: place.bathrooms,
        numberOfReview: place._count.review,
        host: {
          name: place.host.user.username,
        },
        images: place.placeImage,
      }),
    );

    place_list = places.map((place) => {
      const { id, title, placeType, pricePerDay } = place;
      return { id, title, placeTypeName: placeType.name, pricePerDay };
    });

    res.status(200).json({
      message: 'SUCCESS',
      place_list,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeList,
};
