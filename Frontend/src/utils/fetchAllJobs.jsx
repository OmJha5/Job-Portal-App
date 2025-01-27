import axios from "axios";
import { JOB_API_ENDPOINT } from "./endpoint";
import { setAllJobs } from "@/redux/jobSlice";

const fetchAllJobs = async (dispatch) => {
  try {
    const res = await axios.get(`${JOB_API_ENDPOINT}/get`, { withCredentials: true });
    if (res.data.success) {
      dispatch(setAllJobs(res.data.jobs));
    }
  } catch (e) {
    console.error("Error fetching jobs:", e);
  }
};

export default fetchAllJobs;
