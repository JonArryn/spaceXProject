import * as model from "./model.js";
import * as view from "./views/capsuleView.js";
import * as homeView from "./views/homeView.js";

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
  },
};

const createCapsules = async function () {
  try {
    const capsuleData = await model.getCapsules(
      state.capsules.pagination.perPage,
      state.capsules.pagination.numPage
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

// routing

window.addEventListener("hashchange", function () {
  if (this.location.hash === "#home") {
    homeView.goHome();
  }
  if (this.location.hash === "#capsules") {
    createCapsules();
  }
});
