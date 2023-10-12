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
        attributes: [
          //   [sequelize.literal("Company.name"), "company_name"],
          //   [sequelize.literal("Company.country"), "company_country"],
          ["name", "company_name"],
          ["country", "company_country"],
          ["area", "company_area"],
        ],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "content", "CompanyId"],
      },
    });

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
    const postIdToSearch = req.params.id;

    const notice = await Notice.findOne({
      where: { _id: postIdToSearch },
      include: {
        model: Company,
        attributes: [
          ["name", "company_name"],
          ["country", "company_country"],
          ["area", "company_area"],
        ],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "CompanyId"],
      },
      //   include: [
      //     {
      //       model: Company,
      //       attributes: [],
      //       include: {
      //         model: Notice,
      //         attributes: ["_id"],
      //         where: { _id: { [sequelize.Op.ne]: postIdToSearch } },
      //       },
      //     },
      //   ],
      raw: true,
    });

    return res.status(200).send(notice).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
