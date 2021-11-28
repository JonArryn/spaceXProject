import axios from "axios";
const log = console.log;

axios.defaults.baseURL = "https://api.spacexdata.com/v4";

// export const getCapsules = async function () {
//   try {
//     const response = await axios.get(`/capsules`);
//     return response.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// hits spacex query endpoint to pull desired data

export const getCapsules = async function (resLimit, numPage, sortBy = {}) {
	try {
		const response = await axios.post(`/capsules/query`, {
			options: { limit: resLimit, page: numPage, sort: sortBy },
		});
		log(response.data);
		return response.data;
	} catch (err) {
		console.error(err);
	}
};
