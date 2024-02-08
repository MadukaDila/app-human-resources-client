import axios from 'axios';

export const FetchData = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_AXIOS_API_URL}/fetchEmployeeAttendance`);
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};