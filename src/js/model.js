import axios from "axios";

axios.defaults.baseURL = "https://api.spacexdata.com/v4/";

const getRequest = function (endpoint) {
  axios
    .get(`${endpoint}`)
    .then((response) => log(response))
    .catch((err) => log(err));
};
