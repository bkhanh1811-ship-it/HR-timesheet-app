const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/attendanceController");

router.post("/", AttendanceController.upsertAttendance);
router.get("/", AttendanceController.getAttendanceByMonth);

module.exports = router;
