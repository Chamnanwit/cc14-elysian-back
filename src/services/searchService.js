const searchRepository = require("../repositories/searchRepository");

exports.getRoomType = () => searchRepository.getRoomType();

exports.getProvince = () => searchRepository.getProvince();

exports.getHomeSearch = (location) => searchRepository.getHomeSearch(location);
