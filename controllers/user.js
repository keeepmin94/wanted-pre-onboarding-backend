const User = require("../models/user");

exports.registerUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.create({
      name,
    });
    return res
      .status(201)
      .json({
        message: "유저 등록 성공",
        user,
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

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!users) {
      next({ status: 400, message: "사용자를 찾을수 없습니다." });
      return;
    }

    return res.status(201).send(users).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
