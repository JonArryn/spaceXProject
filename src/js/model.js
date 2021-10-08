import axios from "axios";
const log = console.log;

axios.defaults.baseURL = "https://api.spacexdata.com/v4/";

export const state = {
  capsules: [],
};

const createCapsules = function (data) {
  state.capsules = data;
  log(state.capsules);
};

export const getRequest = function (endpoint) {
  axios
    .get(`${endpoint}`)
    .then((response) => createCapsules(response.data))
    .catch((err) => log(err));
};
