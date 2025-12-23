const { Attendance, Employee } = require("../models");

module.exports = class AttendanceController {
  // Lưu / cập nhật chấm công (upsert theo EmployeeId + month + day)
  static async upsertAttendance(req, res) {
    try {
      const { EmployeeId, month, day, value } = req.body;

      const [record, created] = await Attendance.findOrCreate({
        where: { EmployeeId, month, day },
        defaults: { value },
      });

      if (!created) {
        record.value = value;
        await record.save();
      }

      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Lấy chấm công theo tháng (kèm thông tin nhân viên)
  static async getAttendanceByMonth(req, res) {
    try {
      const { month } = req.query;

      const data = await Attendance.findAll({
        where: { month },
        include: [{ model: Employee, attributes: ["id", "name"] }],
        order: [["EmployeeId", "ASC"], ["day", "ASC"]],
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
