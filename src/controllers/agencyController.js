const { Property } = require("../models");

const agencyService = require("../services/agencyService");

exports.createProperty = async (req, res, next) => {
  try {
    const value = req.body;

    const property = await agencyService.createProperty(value);

    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

exports.getAllProperty = async (req, res, next) => {
  try {
    const result = await agencyService.getAllProperty();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.getPropertyById(id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.deleteProperty(id);
    res.status(200).json({ message: "delete success" });
  } catch (err) {
    next(err);
  }
};

// exports.updateContent = (req, res, next) => {
//   const { id } = req.params;
//   const {
//     title,
//     supTitle,
//     image,
//     ingredients,
//     directions,
//     cardId,
//     userId,
//     typefoodId,
//   } = req.body;
//   Content.update(
//     { ...req.body, userId: req.user.id },
//     {
//       where: { id: id },
//     }
//   )
//     .then((rs) => {
//       res.status(200).json(rs);
//     })
//     .catch(next);
// };
