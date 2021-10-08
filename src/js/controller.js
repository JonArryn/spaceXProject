import * as model from "./model.js";
import * as view from "./view.js";

const renderCapsules = async function () {
  try {
    await model.getCapsulesAsync();

    view.capsuleView(model.state.capsules.headers, model.state.capsules.data);
  } catch (err) {
    console.error(err);
  }
};

renderCapsules();
