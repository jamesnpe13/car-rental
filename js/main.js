window.addEventListener("DOMContentLoaded", main);
const indexPage = document.getElementById("vehicles");

function main() {
   initApp();
}

function initApp() {
   loadIndexPage(indexPage);
   window.scrollTo(0, 1);
}

function loadIndexPage(page) {
   page.scrollIntoView();
}

// function transitionPages(e) {
//    var thisSection = e.target.closest(".box-container");
//    var nextPage = document.querySelector("#target-page");
//    var nextPageContent = nextPage.querySelector(".box-container");

//    thisSection.classList.add("hide");
//    setTimeout(() => {
//       console.log(nextPage);
//       nextPage.scrollIntoView();
//       nextPageContent.classList.remove("hide");
//    }, 200);
// }
