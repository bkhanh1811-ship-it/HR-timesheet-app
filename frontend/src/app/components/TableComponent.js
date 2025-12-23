"use client";
import { useEffect, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

const DAYS_IN_MONTH = 31;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function TableComponent() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch nhân viên thật từ backend
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch(`${baseURL}employees`);
        const data = await res.json();

        const mapped = data.map((emp) => ({
          id: emp.id,
          name: emp.name,
          attendance: Array(DAYS_IN_MONTH).fill(""),
        }));

        setEmployees(mapped);
      } catch (err) {
        console.error("Fetch employees failed", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  const handleChange = (empIndex, dayIndex, value) => {
    const updated = [...employees];
    updated[empIndex].attendance[dayIndex] = value;
    setEmployees(updated);
  };

  const calculateTotal = (attendance) =>
    attendance.reduce((sum, val) => {
      if (val === "1") return sum + 1;
      if (val === "0.5") return sum + 0.5;
      if (val === "CN") return sum + 1;
      return sum;
    }, 0);

  if (loading) {
    return <Typography>Đang tải danh sách nhân viên…</Typography>;
  }

  return (
    <Sheet
      variant="outlined"
      sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm", p: 2 }}
    >
      <Typography level="h4" mb={2}>
        BẢNG CHẤM CÔNG THEO THÁNG
      </Typography>

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
