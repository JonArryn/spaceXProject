import * as capsuleController from "./capsuleController.js";
import * as capsuleView from "../views/capsuleView";
import * as homeView from "../views/homeView";

// capsules
capsuleView.pageChange(capsuleController.pageUpdate);

capsuleView.updateResults(capsuleController.resultsUpdate);

capsuleView.sort(capsuleController.updateSort);

// routing

window.addEventListener("load", function () {
  if (this.location.hash === "#home") {
    homeView.goHome();
  }
  if (this.location.hash.indexOf("capsules") === 1) {
    capsuleController.createCapsules();
  }
});

window.addEventListener("hashchange", function () {
  if (this.location.hash === "#home") {
    homeView.goHome();
  }
  if (this.location.hash.indexOf("capsules") === 1) {
    capsuleController.createCapsules();
  }
});
