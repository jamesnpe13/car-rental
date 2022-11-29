window.addEventListener("DOMContentLoaded", main);

function main() {
  

   document.addEventListener("dataLoaded", (e) => {
      // create vehicle items in list
      createVehicleItems(e.detail.vehicleData);

      // item button click listener
      initItems();
   });

   window.scrollTo(0, 1);
}

// async function fetchVehicleData() {
//    const vehicleDataURL = "./json/vehicles.json";
//    var response = await fetch(vehicleDataURL);
//    var data = await response.json();

//    const dataLoaded = new CustomEvent("dataLoaded", {
//       detail: {
//          vehicleData: data,
//       },
//    });

//    document.dispatchEvent(dataLoaded);
// }

function createVehicleItems(data) {
   var vehicles = data.vehicles;
   const itemList = document.querySelector(".item-list");
   if (vehicles) {
      for (var vehicle of vehicles) {
         var item = document.createElement("div");
         var thumbnail = document.createElement("img");
         var textContainer = document.createElement("div");
         var nameText = document.createElement("h4");
         var descriptionText = document.createElement("span");
         var bar = document.createElement("div");
         var arrow = document.createElement("img");

         item.className = "item";
         thumbnail.className = "image-thumbnail";
         textContainer.className = "text-container";
         bar.className = "bar";

         itemList.appendChild(item);
         item.appendChild(thumbnail);
         item.appendChild(textContainer);
         item.appendChild(bar);
         textContainer.appendChild(nameText);
         textContainer.appendChild(descriptionText);
         bar.appendChild(arrow);

         thumbnail.src = vehicle.img_url;
         arrow.src = "./images/icons/back-icon.svg";
         nameText.textContent = vehicle.make + " " + vehicle.model;
         descriptionText.textContent = `$${vehicle.rate}/km`;
      }
   }
}

function initItems() {
   var items = document.querySelectorAll(".item");
   var homePage = document.querySelector("#route-calc");

   setTimeout(() => {
      loadIndexPage(homePage);
   }, 0);

   for (var item of items) {
      item.addEventListener("click", (e) => {
         // transitionPages(e);
         transitionElements(e);
      });
   }
}

function loadIndexPage(page) {
   page.scrollIntoView();
   page.firstElementChild.classList.remove("hide");
}

function transitionElements(e) {
   const elements = e.target.closest(".box-container").querySelectorAll(".item-list>*");

   if (elements.length > 0) transitionLoop(elements.length);

   function transitionLoop(length) {
      var index = length - 1;
      setTimeout(() => {
         console.log(index);
         elements[index].setAttribute("data-hidden", "true");
         if (length > 1) transitionLoop(length - 1);
      }, 40);
   }
}

function transitionPages(e) {
   var thisSection = e.target.closest(".box-container");
   var nextPage = document.querySelector("#target-page");
   var nextPageContent = nextPage.querySelector(".box-container");

   thisSection.classList.add("hide");
   setTimeout(() => {
      console.log(nextPage);
      nextPage.scrollIntoView();
      nextPageContent.classList.remove("hide");
   }, 200);
}
