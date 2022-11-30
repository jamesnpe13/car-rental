var vehicleData = {};

document.addEventListener("DOMContentLoaded", fetchVehicleData);
// fetch local json
async function fetchVehicleData() {
   var dataURL = "../car-rental/json/vehicles.json";
   var response = await fetch(dataURL);

   // create vehicle data object
   vehicleData = await response.json();

   // dispatch event
   var jsonLoad = new CustomEvent("jsonLoad");
   document.dispatchEvent(jsonLoad);

   // assign vehicle ID
   assignVehicleID();

   // create vehicle items
   createVehicleItems();

   console.log("JSON LOADED", response.ok, vehicleData);
   // console.table(getAllVehicles());
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
function tableData() {
   console.table(vehicleData.motorbikes);
   console.table(vehicleData.small_vehicles);
   console.table(vehicleData.large_vehicles);
   console.table(vehicleData.extra_large_vehicles);
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

function createVehicleItems() {
   var allVehiclesArray = getAllVehicles();
   const itemCardContainer = document.querySelector(".item-card-container");

   for (var item of allVehiclesArray) {
      itemCardContainer.innerHTML += `<div class="item-card" data-id="${item.vehicle_id}"><img src="${item.img_url}" alt="" /><div class="text-container"><h4>${item.model}</h4><span>${item.class}</span></div><div class="accent-bar"><i class="fa-solid fa-arrow-right"></i></div></div>`;
   }

   // dispatch event
   var itemCardsCreate = new CustomEvent("itemCardsCreate");
   document.dispatchEvent(itemCardsCreate);
}

// toggle list view
const itemCardContainer = document.querySelector(".item-card-container");

window.onclick = () => {
   if (itemCardContainer.classList.contains("block")) {
      itemCardContainer.classList.replace("block", "thumb");
   } else {
      itemCardContainer.classList.replace("thumb", "block");
   }
};

// filtering
var filters = {
   persons: prompt("How many people?"),
   days: prompt("How many days?"),
};

document.addEventListener("itemCardsCreate", filterVehicles);

function filterVehicles() {
   var itemCards = document.querySelectorAll(".item-card");
   var allVehiclesArray = getAllVehicles();

   // hide all cards
   itemCards.forEach((item) => {
      item.style.display = "none";
   });

   // show all cards that match filter

   itemCards.forEach((item) => {
      allVehiclesArray.forEach((vehicle) => {
         if (item.getAttribute("data-id") == vehicle.vehicle_id) {
            if (filters.persons <= vehicle.seats && filters.days >= vehicle.min_days && filters.days <= vehicle.max_days) {
               console.log("match");
               item.style.display = "flex";
            } else {
               console.log("no match");
            }
         }
      });
   });
}
