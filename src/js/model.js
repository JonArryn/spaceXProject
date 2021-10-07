import axios from "axios";
const log = console.log;

axios.defaults.baseURL = "https://api.spacexdata.com/v4/";

export const getRequest = function (endpoint) {
  axios
    .get(`${endpoint}`)
    .then((response) => log(response))
    .catch((err) => log(err));
};
