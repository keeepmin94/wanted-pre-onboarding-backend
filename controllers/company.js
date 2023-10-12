const Company = require("../models/company");

exports.registerCompany = async (req, res, next) => {
  try {
    const { name } = req.body;
    const company = await Company.create({
      name,
    });
    return res
      .status(201)
      .json({
        message: "성공",
        company,
      })
      .end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.getCompanys = async (req, res, next) => {
  try {
    const companys = await Company.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.status(201).send(companys).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
