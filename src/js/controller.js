import * as model from "./model.js";
import * as view from "./views/capsuleView.js";
import * as homeView from "./views/homeView.js";

const log = console.log;

const state = {
  capsules: { headers: [], data: [] },
};

const createCapsules = async function () {
  try {
    const capsuleData = await model.getCapsules();
    state.capsules.headers = Object.keys(capsuleData[0]);
    state.capsules.data = capsuleData;
    view.capsuleView(state.capsules.data);
    log(state.capsules);
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener("hashchange", function () {
  if (this.location.hash === "#capsules") {
    createCapsules();
  }
});

window.addEventListener("hashchange", function () {
  if (this.location.hash === "#home") {
    homeView.goHome();
  }
});
