var userObject = {
   filters: {},
   selected_vehicle: undefined,
   total_cost: 0,
   petrol_cost: 0,
};

window.addEventListener("DOMContentLoaded", main);

// set index page
const indexPage = "login";
document.getElementById(indexPage).setAttribute("data-active", "true");

function main() {
   manageActivePage();
}

function initApp() {
   window.scrollTo(0, 1);
}

function gotoPage(page) {
   var pageTitle = page.getAttribute("data-page-title");
   var pageTitleText = document.querySelector(".page-title");

   page.setAttribute("data-active", "true");
   console.log("active", page.getAttribute("data-active"));

   page.scrollIntoView();
   console.log("scrolled into view");

   page.classList.remove("hidden");
   console.log("hidden", page.classList.contains("hidden"));

   pageTitleText.textContent = pageTitle;
   console.log(`NEW page: => ${page.id}`);
}

function manageActivePage(page) {
   pagesArray.forEach((item) => {
      if (item.getAttribute("data-active")) {
         gotoPage(item);
      }

      // scroll back to first filter screen
      if (item.getAttribute("data-active" && item.id == "filter")) {
         if (item.id == "filter") {
            document.getElementById("filter-1").scrollIntoView();
         }
      }
   });
}

// button links
const pageLinksArray = document.querySelectorAll(".page-link");
const pagesArray = document.querySelectorAll(".page");
const backButtonArray = document.querySelectorAll(".back-button");
console.log(pagesArray);

for (var link of pageLinksArray) {
   link.addEventListener("click", (e) => {
      var targetPageName = e.target.getAttribute("data-target-page");
      var targetPage = document.getElementById(targetPageName);

      for (var item of pagesArray) {
         if (item.classList.contains("hidden") == false) {
            item.classList.add("hidden");
         }
         if (item.getAttribute("data-active")) {
            item.removeAttribute("data-active");
         }
      }
      setTimeout(() => {
         gotoPage(targetPage);
      }, 1000);
   });
}

for (var backBtn of backButtonArray) {
   backBtn.addEventListener("click", () => {
      var currentPageIndex;
      var targetPage;

      for (i = 0; i < pagesArray.length; i++) {
         if (pagesArray[i].getAttribute("data-active")) {
            currentPageIndex = i;
            targetPage = pagesArray[currentPageIndex - 1];
         }
      }

      for (var item of pagesArray) {
         if (item.getAttribute("data-active")) {
            item.removeAttribute("data-active");
         }
      }

      if (targetPage) {
         targetPage.setAttribute("data-active", "true");
      } else {
         console.log("This is the first index page");
      }

      console.log(currentPageIndex);

      manageActivePage(targetPage);
   });
}

/*
login - no header
filter
vehicles
garage
route calc
summary
payment

dashboard
*/

// reveal items
function revealHide() {
   var revealingItems = document.querySelectorAll(".revealing-item");

   var i = 0;

   var int = setInterval(() => {
      if (revealingItems[i].classList.contains("hidden")) {
         revealingItems[i].classList.remove("hidden");
      } else {
         revealingItems[i].classList.add("hidden");
      }

      i++;
   }, 20);

   if (i >= int) {
      clearInterval(int);
   }
}
