const Applicant = require("../models/applicant");

exports.registerApplicant = async (req, res, next) => {
  try {
    const { userId, companyId } = req.body;

    const user_applicant = await Applicant.findOne({
      where: { UserId: userId, company_id: companyId },
    });

    if (user_applicant) {
      res.json({ result: false, message: "이미 지원한 공고입니다." });
      return;
    }

    const applicant = await Applicant.create({
      company_id: companyId,
      UserId: userId,
    });

    return res
      .status(201)
      .json({
        message: "지원 등록 성공",
        applicant,
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

// exports.getCompanys = async (req, res, next) => {
//   try {
//     const companys = await Company.findAll({
//       attributes: {
//         exclude: ["createdAt", "updatedAt"],
//       },
//     });

//     return res.status(201).send(companys).end();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: "서버 에러",
//     });
//   }
// };
