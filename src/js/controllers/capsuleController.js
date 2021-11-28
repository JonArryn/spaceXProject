import * as model from "../model.js";
import * as view from "../views/capsuleView.js";

const log = console.log;

const state = {
	capsules: {
		headers: [],
		data: [],
		pagination: {
			totalDocs: "",
			perPage: 10,
			totalPages: "",
			pageArr: [],
			numPage: 1,
		},
		sort: { serial: "asc" },
	},
};

// main function that pulls data from API and calls functions from capsuleView to display it in the UI
export const createCapsules = async function () {
	// state.capsules.sort = currentSort;
	try {
		// hits API and stores data into the state
		const capsuleData = await model.getCapsules(
			state.capsules.pagination.perPage,
			state.capsules.pagination.numPage,
			state.capsules.sort
		);
		state.capsules.headers = Object.keys(capsuleData.docs[0]);
		state.capsules.data = capsuleData.docs;
		state.capsules.pagination.totalDocs = capsuleData.totalDocs;
		state.capsules.pagination.totalPages = capsuleData.totalPages;
		state.capsules.pagination.pageArr = [
			...Array(state.capsules.pagination.totalPages).keys(),
		].map((i) => i + 1);

		// calls view function and passes state data into it
		view.capsuleView(state.capsules.data);
		// calls pagination view function and passes pagination data into it
		view.capsulePagination(state.capsules.pagination);
		log(state.capsules);
	} catch (err) {
		console.error(err);
	}
};

export const pageUpdate = function (btnValue) {
	if (btnValue === "prev" && state.capsules.pagination.numPage <= 1) {
		return;
	} else if (
		btnValue === "next" &&
		state.capsules.pagination.numPage >=
			Math.max(...state.capsules.pagination.pageArr)
	) {
		return;
	} else if (btnValue === "prev") {
		--state.capsules.pagination.numPage;
	} else ++state.capsules.pagination.numPage;
	log(state.capsules.pagination.numPage);
	createCapsules();
	view.capsuleView(state.capsules.data);
};

// used by controller.js to update results per page
export const resultsUpdate = function (resultQty) {
	if (resultQty === "all") {
		state.capsules.pagination.perPage = state.capsules.pagination.totalDocs;
	} else state.capsules.pagination.perPage = +resultQty;
	state.capsules.pagination.numPage = 1;
	createCapsules();
	view.capsuleView(state.capsules.data);
};

export const updateSort = function (sortObj) {
	state.capsules.sort = sortObj;
	createCapsules();
	view.capsuleView(state.capsules.data);
};
