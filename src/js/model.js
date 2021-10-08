import axios from "axios";
const log = console.log;

axios.defaults.baseURL = "https://api.spacexdata.com/v4/";

export const state = {
  capsules: { headers: [], data: [] },
};

export const createCapsules = function (data) {
  state.capsules.headers = Object.keys(data[0]);
  state.capsules.data = data;
  log(state.capsules);
};

export const getCapsulesAsync = async function () {
  try {
    const response = await axios.get(`capsules`);
    createCapsules(response.data);
  } catch (err) {
    console.error(err);
  }
};
