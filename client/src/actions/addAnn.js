import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// AddAnnouncement
export const addAnnouncement = (announcementData, history) => dispatch => {
  axios
    .post("/api/announcements/add", announcementData)
    .then(res => history.push("/")) // re-direct to homepage
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Announcement
export const updateAnnouncement = (announcementData) => {
  axios
    .post("/api/announcements/update/${announcementData.id}", announcementData)
    .then()
    .catch(err => {
      console.log(err);
    });
};
