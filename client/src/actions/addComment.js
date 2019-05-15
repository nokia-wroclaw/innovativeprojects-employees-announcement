import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// AddAnnouncement
export const addComment = (commentData, history) => dispatch => {
  axios
    .post("/api/comments/add", commentData)
    .then(res => history)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
