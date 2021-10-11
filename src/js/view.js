const log = console.log;
const tableHeader = document.querySelector(".table__header");
const tableRows = document.querySelector(".table__rows");

export const capsuleView = function (data) {
  tableHeader.innerHTML = "";
  const headerMarkup = `<th>Serial Number</th>
   <th>Current Status</th>
   <th>Capsule Type</th>
   <th>Total Launch Count</th>
   <th>Water Landings Count</th>
   <th>Land Landings Count</th>
   <th>Number of Resues</th>
   <th>Last Seen</th>
  `;
  tableHeader.insertAdjacentHTML("afterbegin", headerMarkup);

  tableRows.innerHTML = "";
  data.forEach((capsule) => {
    tableRows.insertAdjacentHTML(
      "afterend",
      `<tr class="table__rows">
      <td>${capsule.serial}</td>
      <td>${capsule.status}</td>
      <td>${capsule.type}</td>
      <td>${capsule.launches.length}</td>
      <td>${capsule.water_landings}</td>
      <td>${capsule.land_landings}</td>
      <td>${capsule.reuse_count}</td>
      <td>${capsule.last_update}</td>
      </tr>
    `
    );
  });
};
