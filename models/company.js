const Sequelize = require("sequelize");

class Company extends Sequelize.Model {
  static initiate(sequelize) {
    Company.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          comment: "회사 ID",
        },
        name: {
          type: Sequelize.STRING,
          comment: "회사명",
        },
        country: {
          type: Sequelize.STRING,
          comment: "국가",
        },
        area: {
          type: Sequelize.STRING,
          comment: "지역",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Company",
        tableName: "companys",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Company.hasMany(db.Notice);
  }
}

module.exports = Company;
