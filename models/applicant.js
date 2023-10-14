const Sequelize = require("sequelize");

class Applicant extends Sequelize.Model {
  static initiate(sequelize) {
    Applicant.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "지원 ID",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Applicant",
        tableName: "applicants",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Applicant.belongsTo(db.User);
    db.Applicant.belongsTo(db.Notice);
  }
}

module.exports = Applicant;
