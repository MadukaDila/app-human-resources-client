import React from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { convertSerialDateToFormattedString } from '../../utils/attendance';


const AttendanceUpload = () => {
  const uploadDataToServer = async (data: any) => {
    try {
      console.log(data);
      const res = await axios.post(`${process.env.REACT_APP_AXIOS_API_URL}/uploadAttendance`, {attendance_data : data});
      console.log(res);
      alert('Attendance data uploaded successfully.');
    } catch (err) {
      console.error(err);
      alert('Error uploading attendance data.');
    }
  };

  const readUploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.querySelector('#upload');

    if (fileInput instanceof HTMLInputElement) {
      const file = fileInput.files?.[0];

      if (file) {
        const allowedFileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        const fileType = file.type;

        if (allowedFileTypes.includes(fileType)) {
          const chunkSize = 1024 * 1024; // 1MB
          let offset = 0;
          const reader = new FileReader();
  
          const processChunk = (chunk: ArrayBuffer) => {
            const workbook = XLSX.read(chunk, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            // Convert serial dates to Date objects
            const processedData = json.map((entry: any) => {
              const checkInDate = convertSerialDateToFormattedString(entry.check_in);
              const checkOutDate = convertSerialDateToFormattedString(entry.check_out);

              return {
                employee_id: entry.employee_id,
                check_in: checkInDate,
                check_out: checkOutDate,
              };
            });
            uploadDataToServer(processedData);
          };
  
          const readNextChunk = () => {
            const chunk = file.slice(offset, offset + chunkSize);
            reader.onload = (e) => {
              const target: any = e.target;
              const chunkData: any = target.result;
              processChunk(chunkData);
              offset += chunkSize;
              if (offset < file.size) {
                readNextChunk();
              }
            };
            reader.readAsArrayBuffer(chunk);
          };
  
          readNextChunk();
        } else {
          console.error('Invalid file type.');
          alert('Invalid file type.');
        }
      } else {
        console.error('No file selected.');
        alert('No file selected.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <form onSubmit={readUploadFile}>
          <label htmlFor="upload" className="block text-sm font-medium text-gray-700">
            Upload the Attendance sheet
          </label>
          <div className="mt-2">
            <input type="file" id="upload" className="p-2 border border-gray-300 rounded w-full" />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceUpload;