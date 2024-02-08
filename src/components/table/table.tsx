import React from 'react';
import { formatCheckinValue, formatCheckoutValue } from '../../utils/attendance';

// Define the structure of each attendance record
type AttendanceData = {
  employee: {
    employee_id: number;
    name: string;
  };
  employee_id: number;
  check_in: Date | null;
  check_out: Date | null;
  total_hours: number | null;
};

// Define the properties expected by the AttendanceTable component
interface AttendanceTableProps {
  attendanceData: AttendanceData[];
}

// Define the functional component for displaying attendance data in a table
export default function Table({ attendanceData }: AttendanceTableProps) {

  return (
    // Render the table to display attendance information
    <table
      id="attendanceTable"
      className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden"
    >
      {/* Table header */}
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="py-2 px-4">Name of the employee</th>
          <th className="py-2 px-4">CheckIn</th>
          <th className="py-2 px-4">CheckOut</th>
          <th className="py-2 px-4">Total Hours</th>
        </tr>
      </thead>
      {/* Table body with attendance data */}
      <tbody>
        {attendanceData.map((item, index) => {
          const { employee, check_in, check_out, total_hours } = item;
          return (
            // Row for each attendance record
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              {/* Display the name of the employee */}
              <td className="py-2 px-4">{employee?.name}</td>
              {/* Display the formatted check-in time */}
              <td className="py-2 px-4">{formatCheckinValue(check_in)}</td>
              {/* Display the formatted check-out time */}
              <td className="py-2 px-4">{formatCheckoutValue(check_out)}</td>
              {/* Display total hours or 'N/A' if null */}
              <td className="py-2 px-4">{total_hours !== null ? total_hours : 'N/A'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
