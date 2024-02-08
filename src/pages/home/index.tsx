import React, { useState, useEffect } from 'react';
import { FetchData } from '../../api/fetchData';
import Table from '../../components/table/table';

// Homepage component to display attendance data
const Homepage = () => {
  // State to store attendance data and handle errors
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch attendance data from the service
  const fetchData = async () => {
    try {
      // Fetch data from the service
      const response = await FetchData();
      // Update state with the fetched attendance data
      setAttendanceData(response.data);
    } catch (err : any) {
      // Handle errors by logging and setting an error message
      console.error(err);
      setError(err.message);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Display error message if there is an error */}
      {error && <p>{error}</p>}
      
      {/* Display the AttendanceTable component with fetched attendance data */}
      <Table attendanceData={attendanceData} />
    </div>
  );
};

export default Homepage;
