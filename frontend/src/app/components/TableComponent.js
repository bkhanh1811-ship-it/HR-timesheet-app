"use client";
import { useEffect, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const DAYS_IN_MONTH = 31;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

function getCurrentMonth() {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}`; // YYYY-MM
}

export default function TableComponent() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(getCurrentMonth());

  // Load employees + attendance theo tháng
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // 1) Employees
        const er = await fetch(`${baseURL}employees`);
        const employeesData = await er.json();

        // 2) Attendance theo tháng
        const ar = await fetch(`${baseURL}attendance?month=${month}`);
        const attendanceData = await ar.json();

        // Map attendance vào từng nhân viên
        const mapped = employeesData.map((emp) => {
          const row = Array(DAYS_IN_MONTH).fill("");
          attendanceData
            .filter((a) => a.EmployeeId === emp.id)
            .forEach((a) => {
              if (a.day >= 1 && a.day <= DAYS_IN_MONTH) {
                row[a.day - 1] = a.value;
              }
            });

          return { id: emp.id, name: emp.name, attendance: row };
        });

        setEmployees(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [month]);

  // Lưu từng ô (upsert)
  const saveCell = async (EmployeeId, day, value) => {
    try {
      await fetch(`${baseURL}attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EmployeeId,
          month,
          day,
          value,
        }),
      });
    } catch (e) {
      console.error("Save attendance failed", e);
    }
  };

  const handleChange = (empIndex, dayIndex, value) => {
    const updated = [...employees];
    updated[empIndex].attendance[dayIndex] = value;
    setEmployees(updated);

    // Persist
    saveCell(updated[empIndex].id, dayIndex + 1, value);
  };

  const calculateTotal = (attendance) =>
    attendance.reduce((sum, val) => {
      if (val === "1") return sum + 1;
      if (val === "0.5") return sum + 0.5;
      if (val === "CN") return sum + 1;
      return sum;
    }, 0);

  if (loading) {
    return <Typography>Đang tải dữ liệu…</Typography>;
  }

  return (
    <Sheet
      variant="outlined"
      sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm", p: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography level="h4">BẢNG CHẤM CÔNG</Typography>
        <Select value={month} onChange={(_, v) => setMonth(v)} size="sm">
          {/* Có thể sinh thêm option theo nhu cầu */}
          <Option value={month}>{month}</Option>
        </Select>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <Table borderAxis="both">
          <thead>
            <tr>
              <th style={{ position: "sticky", left: 0, background: "#fff" }}>
                Nhân viên
              </th>
              {Array.from({ length: DAYS_IN_MONTH }, (_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
              <th>Tổng công</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, empIndex) => (
              <tr key={emp.id}>
                <td
                  style={{
                    position: "sticky",
                    left: 0,
                    background: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {emp.name}
                </td>

                {emp.attendance.map((val, dayIndex) => (
                  <td key={dayIndex}>
                    <input
                      value={val}
                      onChange={(e) =>
                        handleChange(empIndex, dayIndex, e.target.value)
                      }
                      className="w-10 text-center border rounded"
                    />
                  </td>
                ))}

                <td style={{ fontWeight: "bold", textAlign: "center" }}>
                  {calculateTotal(emp.attendance)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Sheet>
  );
}
