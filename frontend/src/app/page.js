"use client";

import { useState } from "react";

const DAYS_IN_MONTH = 31;

// mock data – sẽ thay bằng API sau
const initialEmployees = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    attendance: Array(DAYS_IN_MONTH).fill(""),
  },
  {
    id: 2,
    name: "Trần Văn B",
    attendance: Array(DAYS_IN_MONTH).fill(""),
  },
];

export default function Home() {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleChange = (empIndex, dayIndex, value) => {
    const updated = [...employees];
    updated[empIndex].attendance[dayIndex] = value;
    setEmployees(updated);
  };

  const calculateTotal = (attendance) => {
    return attendance.reduce((sum, val) => {
      if (val === "1") return sum + 1;
      if (val === "0.5") return sum + 0.5;
      if (val === "CN") return sum + 1;
      return sum;
    }, 0);
  };

  return (
    <main className="min-h-screen p-6 bg-white rounded-lg shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">
        BẢNG CHẤM CÔNG THEO THÁNG
      </h1>

      <div className="overflow-auto">
        <table className="border-collapse border w-full text-sm">
          <thead>
            <tr>
              <th className="border p-2 sticky left-0 bg-white">Nhân viên</th>
              {Array.from({ length: DAYS_IN_MONTH }, (_, i) => (
                <th key={i} className="border p-2">
                  {i + 1}
                </th>
              ))}
              <th className="border p-2 font-bold">Tổng công</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, empIndex) => (
              <tr key={emp.id}>
                <td className="border p-2 sticky left-0 bg-white font-semibold">
                  {emp.name}
                </td>

                {emp.attendance.map((val, dayIndex) => (
                  <td key={dayIndex} className="border p-1">
                    <input
                      className="w-10 text-center border rounded"
                      value={val}
                      onChange={(e) =>
                        handleChange(empIndex, dayIndex, e.target.value)
                      }
                      placeholder=""
                    />
                  </td>
                ))}

                <td className="border p-2 font-bold text-center">
                  {calculateTotal(emp.attendance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
