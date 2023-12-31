const Sequelize = require("sequelize");

class Notice extends Sequelize.Model {
  static initiate(sequelize) {
    Notice.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "채용 공고 ID",
        },
        position: {
          type: Sequelize.STRING,
          comment: "채용 포지션",
        },
        reward: {
          type: Sequelize.INTEGER,
          comment: "채용 보상금",
        },
        skill: {
          type: Sequelize.STRING,
          comment: "사용 기술",
        },
        content: {
          type: Sequelize.TEXT,
          comment: "채용 내용",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Notice",
        tableName: "notices",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Notice.belongsTo(db.Company);
    db.Notice.hasMany(db.Applicant);
  }
}

module.exports = Notice;
