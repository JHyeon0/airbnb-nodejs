const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');

const { PlaceController } = require('../controllers');
// Route 는 오직 Controller 에만 의존 합니다.

router.get('', PlaceController.findPlaces);
router.get('/:placeId', PlaceController.findOnePlace);
router.put(
  '/:placeId',
  [middlewares.validateHost],
  PlaceController.updatePlace,
);
router.get(
  '/:placeId/host',
  [middlewares.validateHost],
  PlaceController.findOnePlaceDetail,
);

module.exports = router; // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
