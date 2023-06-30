const searchService = require("../services/searchService");

exports.getRoomTypeProvince = async (req, res, next) => {
  try {
    const roomtype = await searchService.getRoomType();

    const province = await searchService.getProvince();

    const list = {
      roomtype,
      province,
    };

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.homeSearch = async (req, res, next) => {
  try {
    const location = req.query;

    const result = await searchService.getHomeSearch(location);
  } catch (err) {
    next(err);
  }
};
