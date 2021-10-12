const log = console.log;

const content = document.querySelector(".content");

export const goHome = function () {
  content.innerHTML = "";
  content.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="content__header">
    <h2>Welcome to my SpaceX API Project</h2>
    <p>Click on a link in the nav bar to look at some data!</p>
  </div>`
  );
};
