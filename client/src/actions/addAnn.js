import axios from "axios";

import { GET_ERRORS } from "./types";

// AddAnnouncement
export const addAnnouncement = (announcementData, history) => dispatch => {
  return axios
    .post("/api/announcements/add", announcementData)
    .then(res => history.push("/")) // re-direct to homepage
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
