const log = console.log;
const content = document.querySelector(".content");
const paginationDiv = document.querySelector(".pagination-div");
const pageSelector = document.querySelector(".page-selector");
const pageNumbers = document.querySelector(".page-num");

export const capsuleView = function (data) {
  // clear content
  content.innerHTML = "";
  // create content and table headers
  content.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="content__header">
    <h2>Capsules</h2>
  </div>
  <table class="table">
    <tr class="table__header">
      <th>Serial Number</th>
      <th>Current Status</th>
      <th>Capsule Type</th>
      <th>Total Launch Count</th>
      <th>Water Landings Count</th>
      <th>Land Landings Count</th>
      <th>Number of Resues</th>
      <th>Last Seen</th>
    </tr>
  `
  );
  // insert table rows
  const table = document.querySelector(".table");
  data.forEach((capsule) => {
    table.insertAdjacentHTML(
      "beforeend",
      `
  <tr class="table__rows">  
    <td>${capsule.serial}</td>
    <td>${capsule.status}</td>
    <td>${capsule.type}</td>
    <td>${capsule.launches.length}</td>
    <td>${capsule.water_landings}</td>
    <td>${capsule.land_landings}</td>
    <td>${capsule.reuse_count}</td>
    <td>${
      capsule.last_update ? capsule.last_update : "Location and status unknown"
    }</td>
  </tr>
  `
    );
  });
};

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

export const pageChange = function (handler) {
  paginationDiv.addEventListener("click", (event) => {
    event.preventDefault();
    const btn = event.target.closest(".btn");
    if (!btn) return;

    const btnValue = btn.dataset.jump;

    handler(btnValue);
  });
};

export const updateResults = function (handler) {
  paginationDiv.addEventListener("change", (event) => {
    event.preventDefault();
    const numResults = event.target.closest(".results-per");
    if (!numResults) return;

    const resultValue = numResults.value;

    handler(resultValue);
  });
};
