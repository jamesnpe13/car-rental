var vehicleData = {};

document.addEventListener("DOMContentLoaded", fetchVehicleData);
// fetch local json
async function fetchVehicleData() {
   const dataURL = "../json/vehicles.json";
//    
//    
   var response = await fetch(dataURL);
   var data = await response.json();

   console.log("JSON LOADED", response.ok);
   createVehicleData(data);
   // tableData();
   console.log(getAllVehicles());

   // dispatch listener
   var jsonLoad = new CustomEvent("jsonLoaded");
   document.dispatchEvent(jsonLoad);
}

function createVehicleData(data) {
   vehicleData = data;
   console.log(vehicleData);
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
