import * as model from "../model.js";
import * as view from "../views/capsuleView.js";
import * as homeView from "../views/homeView.js";

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

export const createCapsules = async function () {
  // state.capsules.sort = currentSort;
  try {
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

    view.capsuleView(state.capsules.data);
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
