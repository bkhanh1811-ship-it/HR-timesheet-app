"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.Employee, {
        foreignKey: "EmployeeId",
        onDelete: "CASCADE",
      });
    }
  }

  Attendance.init(
    {
      EmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING, // YYYY-MM
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      day: {
        type: DataTypes.INTEGER, // 1 → 31
        allowNull: false,
        validate: {
          min: 1,
          max: 31,
        },
      },
      value: {
        type: DataTypes.STRING, // 1 | 0.5 | P | CN
        allowNull: false,
        validate: {
          isIn: {
            args: [["1", "0.5", "P", "CN"]],
            msg: "Attendance value must be 1, 0.5, P or CN",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Attendance",
      indexes: [
        {
          unique: true,
          fields: ["EmployeeId", "month", "day"],
        },
      ],
    }
  );

  return Attendance;
};
