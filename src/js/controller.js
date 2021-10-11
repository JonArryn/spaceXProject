import * as model from "./model.js";
import * as view from "./view.js";

const log = console.log;

const state = {
  capsules: { headers: [], data: [] },
};

const createCapsules = async function () {
  const capsuleData = await model.getCapsulesAsync();
  state.capsules.headers = Object.keys(capsuleData[0]);
  state.capsules.data = capsuleData;
  log(state.capsules);
};

createCapsules();

const renderCapsules = async function () {
  try {
    await model.getCapsulesAsync();

    view.capsuleView(state.capsules.headers, state.capsules.data);
  } catch (err) {
    console.error(err);
  }
};

renderCapsules();
