import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

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
