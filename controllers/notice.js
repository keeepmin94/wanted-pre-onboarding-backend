const Notice = require("../models/notice");

exports.registerNotice = async (req, res, next) => {
  try {
    const { position, reward, skill, content, companyId } = req.body;
    const notice = await Notice.create({
      position,
      reward,
      skill,
      content,
      CompanyId: companyId,
    });
    return res
      .status(201)
      .json({
        message: "채용 공고 등록 성공",
        notice,
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

exports.updateNotice = async (req, res, next) => {
  try {
    const { id, position, reward, skill, content } = req.body;
    const notice = await Notice.update(
      {
        position,
        reward,
        skill,
        content,
      },
      { where: { _id: id } }
    );
    return res
      .status(201)
      .json({
        message: "채용 공고 수정 성공",
        notice,
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

// exports.getNotices = async (req, res, next) => {
//   try {
//     const notices = await Notice.findAll({
//       attributes: {
//         exclude: ["createdAt", "updatedAt"],
//       },
//     });

//     return res.status(201).send(notices).end();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: "서버 에러",
//     });
//   }
// };
