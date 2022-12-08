var vehicleData = {};

// var filters = {
//    persons: 3,
//    days: 5,
// };

var filterMatchArray = [];

document.addEventListener("DOMContentLoaded", fetchVehicleData);
// fetch local json
async function fetchVehicleData() {
   const dataURL = "../json/vehicles.json";
   var response = await fetch(dataURL);

   // create vehicle data object
   vehicleData = await response.json();

   // dispatch event
   var jsonLoad = new CustomEvent("jsonLoad");
   document.dispatchEvent(jsonLoad);

   // assign vehicle ID
   assignVehicleID();
}

// assign vehicle ID
function assignVehicleID() {
   const motorbikes = vehicleData.motorbikes;
   const sVehicles = vehicleData.small_vehicles;
   const lVehicles = vehicleData.large_vehicles;
   const xlVehicles = vehicleData.extra_large_vehicles;

   motorbikes.forEach((item) => {
      item.vehicle_id = window.crypto.randomUUID();
   });
   sVehicles.forEach((item) => {
      item.vehicle_id = window.crypto.randomUUID();
   });
   lVehicles.forEach((item) => {
      item.vehicle_id = window.crypto.randomUUID();
   });
   xlVehicles.forEach((item) => {
      item.vehicle_id = window.crypto.randomUUID();
   });
}

function getAllVehicles() {
   var allVehiclesArray = [];

   for (var item of vehicleData.motorbikes) {
      allVehiclesArray.push(item);
   }
   for (var item of vehicleData.small_vehicles) {
      allVehiclesArray.push(item);
   }
   for (var item of vehicleData.large_vehicles) {
      allVehiclesArray.push(item);
   }
   for (var item of vehicleData.extra_large_vehicles) {
      allVehiclesArray.push(item);
   }

   return allVehiclesArray;
}

// create vehicle cards

function createVehicleItems(array) {
   var allVehiclesArray = getAllVehicles();
   const itemCardContainer = document.querySelector(".item-card-container");

   for (var item of array) {
      itemCardContainer.innerHTML += `<div class="splide__slide item-card" data-id="${item.vehicle_id}"><img src="${item.img_url}" alt="" /></div>`;
   }

   // dispatch event
   var itemCardsCreate = new CustomEvent("itemCardsCreate");
   document.dispatchEvent(itemCardsCreate);
}

// toggle list view
const itemCardContainer = document.querySelector(".item-card-container");

// filter selection screen
const sliders = document.querySelectorAll(".filter-page");

sliders.forEach((item) => {
   const input = item.querySelector('input[type="range"]');
   const label = input.previousElementSibling;
   const nextButton = document.querySelector("#filter-next");

   label.textContent = input.value;

   // slider dynamic label
   input.addEventListener("input", () => {
      label.textContent = input.value;
   });

   // next filter page
   nextButton.addEventListener("click", () => {
      document.querySelector("#filter-2").scrollIntoView();
   });
});

// update filter
const saveFilterButton = document.querySelector("#filter-save");

saveFilterButton.addEventListener("click", () => {
   const personsCount = document.querySelector("#persons-count");
   const daysSlider = document.querySelector("#days-count");

   userObject.filters.persons = personsCount.value;
   userObject.filters.days = daysSlider.value;

   filterVehicles();
});

// filtering

function filterVehicles() {
   const itemCards = document.querySelectorAll(".item-card");
   var allVehiclesArray = getAllVehicles();
   filterMatchArray = [];

   // delete existing itemCards
   if (itemCards.length > 0) {
      for (var item of itemCards) {
         item.remove();
         console.log("deleted");
      }
   } else {
      console.log("no existing items");
   }

   // find filter match

   for (var vehicle of allVehiclesArray) {
      if (userObject.filters.persons <= vehicle.seats && userObject.filters.days >= vehicle.min_days && userObject.filters.days <= vehicle.max_days) {
         filterMatchArray.push(vehicle);
      }
   }

   console.table(filterMatchArray);
   createVehicleItems(filterMatchArray);
}

document.getElementById("goto-garage").addEventListener("click", () => {
   displayVehicleDetails(userObject.selected_vehicle);
});
