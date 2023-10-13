const Applicant = require("../models/applicant");

exports.registerApplicant = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const noticeId = req.params.id;
    const user_applicant = await Applicant.findOne({
      where: { UserId: userId, notice_id: noticeId },
    });

    // 해당 채용공고의 1회만 지원 가능함
    if (user_applicant) {
      res.json({ result: false, message: "이미 지원한 공고입니다." });
      return;
    }

    const applicant = await Applicant.create({
      notice_id: noticeId,
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

exports.getApplicants = async (req, res, next) => {
  try {
    const applicants = await Applicant.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!applicants) {
      next({ status: 400, message: "지원자 목록을 찾을수 없습니다." });
      return;
    }

    return res.status(201).send(applicants).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
