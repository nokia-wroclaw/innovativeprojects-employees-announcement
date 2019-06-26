import axios from "axios";

import { GET_ERRORS } from "./types";

// AddAnnouncement
export const addComment = (commentData, history) => dispatch => {
  return axios
    .post("/api/comments/add", commentData)
    .then(res => history)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
