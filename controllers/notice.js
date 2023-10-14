const Notice = require("../models/notice");
const Company = require("../models/company");
const sequelize = require("sequelize");

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
    const { position, reward, skill, content } = req.body;
    const id = req.params.id;
    const notice = await Notice.update(
      {
        position,
        reward,
        skill,
        content,
      },
      { where: { _id: id } }
    );

    if (!notice) {
      next({ status: 400, message: "해당 채용공고를 찾을수 없습니다." });
      return;
    }

    return res
      .status(200)
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

exports.deleteNotice = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Notice.destroy({ where: { _id: id } });
    return res
      .status(200)
      .json({
        message: "채용 공고 삭제 성공",
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

exports.getAllNotices = async (req, res, next) => {
  try {
    const notices = await Notice.findAll({
      include: {
        model: Company,
        attributes: ["name", "country", "area"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "content", "CompanyId"],
      },
      raw: true,
    });

    if (!notices) {
      next({ status: 400, message: "채용공고가 없습니다." });
      return;
    }

    return res.status(200).send(notices).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.getNotice = async (req, res, next) => {
  try {
    const noticeIdToSearch = req.params.id;

    const notice = await Notice.findOne({
      where: { _id: noticeIdToSearch },
      include: {
        model: Company,
        attributes: ["name", "country", "area"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      raw: true,
    });

    if (!notice) {
      next({ status: 400, message: "해당 채용공고를 찾을수 없습니다." });
      return;
    }

    const anotherNotice = await Notice.findAll({
      where: {
        CompanyId: notice.CompanyId,
        _id: { [sequelize.Op.notIn]: [noticeIdToSearch] },
      },
      raw: true,
      attributes: ["_id"],
    });

    const anothers = anotherNotice ? anotherNotice.map((obj) => obj._id) : [];

    notice.anotherNotice = anothers;

    return res.status(200).send(notice).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

exports.getSearchNotice = async (req, res, next) => {
  try {
    const searchId = req.query.tag;

    const notices = await Notice.findAll({
      include: [
        {
          model: Company,
          attributes: ["name", "country", "area"],
        },
      ],
      where: {
        [sequelize.Op.or]: [
          { position: { [sequelize.Op.like]: "%" + searchId + "%" } },
          { skill: { [sequelize.Op.like]: "%" + searchId + "%" } },
          { content: { [sequelize.Op.like]: "%" + searchId + "%" } },
          { "$Company.name$": { [sequelize.Op.like]: "%" + searchId + "%" } },
          {
            "$Company.country$": { [sequelize.Op.like]: "%" + searchId + "%" },
          },
          { "$Company.area$": { [sequelize.Op.like]: "%" + searchId + "%" } },
        ],
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!notices) {
      next({ status: 400, message: "해당 채용공고를 찾을수 없습니다." });
      return;
    }

    return res.status(200).send(notices).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
