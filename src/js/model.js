import axios from "axios";
const log = console.log;

axios.defaults.baseURL = "https://api.spacexdata.com/v4";

export const getCapsulesAsync = async function () {
  try {
    const response = await axios.get(`/capsules`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
// export const getCapsulesAsync = async function () {
//   try {
//     const response = await axios.post(`/capsules/query`, {
//       options: { limit: 6, offset: 18 },
//     });
//     createCapsules(response.data.docs);
//   } catch (err) {
//     console.error(err);
//   }
// };
