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

    return res.status(200).json({
      message: 'SUCCESS',
      placeList,
    });
  } catch (err) {
    next(err);
  }
};

const findOnePlace = async (req, res, next) => {
  try {
    const placeId = Number(req.params.placeId);

    if (isNaN(placeId)) {
      return res.status(400).json({
        message: 'PLACE_ID_MUST_BE_A_VALID_NUMBER',
      });
    }

    const place = await PlaceService.findOnePlace(placeId);

    if (!place) {
      return res.status(404).json({
        message: 'PLACE_DOES_NOT_EXIST',
      });
    }

    const placeInformation = { ...place, host: place.host.user.username };

    return res.status(200).json({
      message: 'SUCCESS',
      placeInformation,
    });
  } catch (err) {
    next(err);
  }
};

const findOnePlaceDetail = async (req, res, next) => {
  try {
    const placeId = Number(req.params.placeId);

    if (isNaN(placeId)) {
      return res.status(400).json({
        message: 'PLACE_ID_MUST_BE_A_VALID_NUMBER',
      });
    }

    const place = await PlaceService.findOnePlaceDetail(placeId);

    if (!place) {
      return res.status(404).json({
        message: 'PLACE_DOES_NOT_EXIST',
      });
    }

    return res.status(200).json({
      message: 'SUCCESS',
      place,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeList,
  findOnePlace,
  findOnePlaceDetail,
};
