import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// AddTopic
export const addTopic = (topicData, history) => dispatch => {
  axios
    .post("/api/topics/add", topicData)
    .then(res => history.push("/TopicsPage")) // re-direct to homepage
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
