const log = console.log;
const tableHeader = document.querySelector(".table__header");
const tableRows = document.querySelector(".table__rows");

export const capsuleView = function (headers, data) {
  tableHeader.innerHTML = "";
  headers.forEach((header) => {
    tableHeader.insertAdjacentHTML("afterbegin", `<th>${header}</th>`);
  });
  tableRows.innerHTML = "";
  data.forEach((capsule) => {
    tableRows.insertAdjacentHTML(
      "afterend",
      `<tr class="table__rows">
      <td>${capsule.id}</td>
      <td>${capsule.type}</td>
      <td>${capsule.status}</td>
      <td>${capsule.serial}</td>
      <td>${capsule.launches.length}</td>
      <td>${capsule.last_update}</td>
      <td>${capsule.land_landings}</td>
      <td>${capsule.water_landings}</td>
      <td>${capsule.reuse_count}</td>
      </tr>
    `
    );
  });
};
