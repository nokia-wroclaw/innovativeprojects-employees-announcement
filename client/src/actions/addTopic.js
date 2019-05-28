import axios from "axios";

import { GET_ERRORS } from "./types";

// AddTopic
export const addTopic = (topicData, history) => dispatch => {
  return axios
    .post("/api/topics/add", topicData)
    .then(res => history.push("/topics")) // re-direct to homepage
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
