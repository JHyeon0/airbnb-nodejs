// Controller 는 오직 Service 레이어에만 의존합니다.
const { PlaceService } = require('../services');

const placeList = async (req, res, next) => {
  try {
    const fields = req.body;
    const places = await PlaceService.findPlace(fields);

    const placeList = places.map((place) => {
      const {
        id,
        title,
        pricePerDay,
        beds,
        bathrooms,
        conveniences,
        maximumGuests,
        host,
        placeType,
        placeImage,
        _count,
      } = place;
      return {
        host: place.host.user.username,
        id,
        title,
        pricePerDay,
        beds,
        bathrooms,
        conveniences,
        maximumGuests,
        placeImage,
        host: host.user.username,
        placeTypeName: placeType.name,
        numberOfReview: _count.review,
      };
    });

    res.status(200).json({
      message: 'SUCCESS',
      placeList,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeList,
};
