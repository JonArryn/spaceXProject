const log = console.log;
const content = document.querySelector(".content");
const paginationDiv = document.querySelector(".pagination-div");
const pageNumbers = document.querySelector(".page-num");
let resultsPerPage;

// // // depricated HTML table structure, changed to CSS grid

// export const capsuleView = function (data) {
//   // clear content
//   content.innerHTML = "";
//   // create content and table headers
//   content.insertAdjacentHTML(
//     "afterbegin",
//     `
//   <div class="content__header">
//     <h2>Capsules</h2>
//   </div>
//   <table class="table">
//     <tr class="table__header">
//       <th class="column" data-property="serial"><a href="#capsules">Serial Number</a></th>
//       <th class="column" data-property="status"><a href="#capsules">Current Status</a></th>
//       <th class="column" data-property="type"><a href="#capsules">Capsule Type</a></th>
//       <th class="column" data-property="launches"><a href="#capsules">Launch Count</th>
//       <th class="column" data-property="water_landings"><a href="#capsules">Water Landings Count</a></th>
//       <th class="column" data-property="land_landings"><a href="#capsules">Land Landings Count</a></th>
//       <th class="column" data-property="reuse_count"><a href="#capsules">Number of Resues</a></th>
//       <th>Last Seen</th>
//     </tr>
//   `
//   );
//   // insert table rows
//   const table = document.querySelector(".table");
//   data.forEach((capsule) => {
//     table.insertAdjacentHTML(
//       "beforeend",
//       `
//   <tr class="table__rows">
//     <td>${capsule.serial}</td>
//     <td>${capsule.status}</td>
//     <td>${capsule.type}</td>
//     <td>${capsule.launches.length}</td>
//     <td>${capsule.water_landings}</td>
//     <td>${capsule.land_landings}</td>
//     <td>${capsule.reuse_count}</td>
//     <td>${
//       capsule.last_update ? capsule.last_update : "Location and status unknown"
//     }</td>
//   </tr>
//   `
//     );
//   });
// };
// // // // // // // //

// function to clear html element and load data from endpoint using CSS grid
// pulls data from capsuleController state
// is called by numerous functions in capsuleController when data needs to be inserted onto page

export const capsuleView = function (data) {
	// clear content of grid
	content.innerHTML = "";
	// creates grid columns and headers
	content.insertAdjacentHTML(
		"afterbegin",
		`
  <div class="content__header">
    <h2>Capsules</h2>
  </div>
<div class="grid-container">
  <div class="grid capsule-grid">
      <a class="column" data-property="serial" href="#capsules">Serial Number</a>
      <a class="column" data-property="status" href="#capsules">Current Status</a>
      <a class="column" data-property="type" href="#capsules">Capsule Type</a>
      <a class="column" data-property="launches" href="#capsules">Launch Count
      <a class="column" data-property="water_landings" href="#capsules">Water Landings Count</a>
      <a class="column" data-property="land_landings" href="#capsules">Land Landings Count</a>
      <a class="column" data-property="reuse_count" href="#capsules">Number of Resues</a>
      <a>Last Seen</a>
    </div>
</div>
  `
	);
	// creates data rows from state in capsule controller
	const grid = document.querySelector(".capsule-grid");
	data.forEach((capsule) => {
		grid.insertAdjacentHTML(
			"beforeend",
			`
    
    <div class="grid-item">${capsule.serial}</div>
    <div class="grid-item">${capsule.status}</div>
    <div class="grid-item">${capsule.type}</div>
    <div class="grid-item">${capsule.launches.length}</div>
    <div class="grid-item">${capsule.water_landings}</div>
    <div class="grid-item">${capsule.land_landings}</div>
    <div class="grid-item">${capsule.reuse_count}</div>
    <div class="grid-item">${
			capsule.last_update ? capsule.last_update : "Location and status unknown"
		}</div>

  `
		);
	});
};

// updates pagination buttons to make visible
// takes in page data from state in capsule controller to display page number and total pages
export const capsulePagination = function (data) {
	// display pagination
	paginationDiv.classList.remove("hidden");
	pageNumbers.innerHTML = "";
	pageNumbers.insertAdjacentHTML(
		"afterbegin",
		`
    <p class="cur-page">Page ${data.numPage} of ${data.totalPages}</p>
`
	);
};

// publisher subscriber function to move to next or previous page which simply grabs the value on the button dataset and passes it into the controller function
// button html in index.html, dataset contains 'next' or 'prev'
// dataset values used in capsuleController.js pageUpdate()
export const pageChange = function (handler) {
	paginationDiv.addEventListener("click", (event) => {
		event.preventDefault();
		const btn = event.target.closest(".btn");
		if (!btn) return;
		// assigns next or prev value from button dataset
		const btnValue = btn.dataset.jump;
		// passes button dataset value into handler function -
		handler(btnValue);
	});
};

// change number of results per page
// pub-sub used by controller.resultsUpdate()
// takes the value of results per page from the html when the user changes the value and passes that value into the handler function as an argument to the function that invokes it
// use as argument in capsuleController.resultsUpdate() which is called by controller.js
export const updateResults = function (handler) {
	paginationDiv.addEventListener("change", (event) => {
		event.preventDefault();
		// selects element
		const numResults = event.target.closest(".results-per");
		if (!numResults) return;
		// assigns results per page value to variable
		const resultValue = numResults.value;
		// passes the results per page value into handler function that calls it - controller.js
		handler(resultValue);
	});
};

// sorts data by column gathers data from the UI to pass into the API endpoint
// pub-sub called by controller.js
export const sort = function (handler) {
	// defaults sort in ascending
	let orderBy = "asc";
	content.addEventListener("click", function (event) {
		event.preventDefault();
		const column = event.target.closest(".column");
		if (!column) return;
		// const sortArr = ["asc", "desc"];
		// creates an object for UI collected values to be stored into which is eventually stored into the capsule state object
		const currentSort = new Object();
		// assigns the value name of the column the user wishes to sort data by
		const sortField = column.dataset.property;
		// switch statement to toggle ascending and descending based on the current value in theh orderBy variable, and reassigns the orderBy variable the opposite value
		switch (orderBy) {
			// case "":
			//   orderBy = "asc";
			//   break;
			case "desc":
				orderBy = "asc";
				break;
			case "asc":
				orderBy = "desc";
				break;
		}
		// updates the window URL with the current sort, currently not being used but will eventually be used when this functionn is refactored to sort data from URL
		window.location.hash = `#capsules?sort=${column.dataset.property}&&order=${orderBy}`;
		// creates key and value for currentSort object which is eventually stored in the capsuleController state
		currentSort[sortField] = orderBy;
		// passes currentSort object as argument for handler function - capsuleController.updateSort()
		handler(currentSort);
	});
};
