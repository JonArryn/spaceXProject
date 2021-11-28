import * as capsuleController from "./capsuleController.js";
import * as capsuleView from "../views/capsuleView";
import * as homeView from "../views/homeView";

// capsules
capsuleView.pageChange(capsuleController.pageUpdate);

// might need to move to capsule controller
// update comments on capsuleView.updateResults() if this is moved
capsuleView.updateResults(capsuleController.resultsUpdate);

capsuleView.sort(capsuleController.updateSort);

// routing

// loads corresponding data from endpoint or home page html based on hash value in the browser URL when the browser is refreshed or reloaded

window.addEventListener("load", function () {
	// loads hompage html from index.html
	if (this.location.hash === "#home") {
		homeView.goHome();
	}
	// listens for URL hashchange to capsules
	if (this.location.hash.indexOf("capsules") === 1) {
		// calls capsules endpoint from capsule crontorller function
		capsuleController.createCapsules();
	}
});

// loads corresponding data from endpoint or home page html based on hash value in the browser URL when nav links are clicked

window.addEventListener("hashchange", function () {
	// loads hompage html from index.html
	if (this.location.hash === "#home") {
		homeView.goHome();
	}
	// listens for URL hashchange to capsules
	if (this.location.hash.indexOf("capsules") === 1) {
		// calls capsules endpoint from capsule crontorller function
		capsuleController.createCapsules();
	}
});
