function displayVehicleDetails(vehicle) {
   const garageSection = document.getElementById("garage");

   const vehicleImage = garageSection.querySelector(".vehicle-image");
   const vehicleModel = garageSection.querySelector(".vehicle-model");
   const vehicleDescription = garageSection.querySelector(".vehicle-description");
   const vehicleClass = garageSection.querySelector(".vehicle-class");
   const vehicleFuelCost = garageSection.querySelector(".vehicle-fuel-cost");
   const vehicleCapacity = garageSection.querySelector(".vehicle-capacity");
   const vehicleMileage = garageSection.querySelector(".vehicle-mileage");
   const vehicleTransmission = garageSection.querySelector(".vehicle-transmission");
   const vehicleDriveType = garageSection.querySelector(".vehicle-drive-type");
   const vehicleCost = garageSection.querySelector(".vehicle-cost");

   vehicleImage.src = vehicle.img_url;
   vehicleModel.textContent = vehicle.model;
   vehicleDescription.textContent = vehicle.description || "Description unavailable";
   vehicleClass.textContent = `Class: ${vehicle.class}`;
   vehicleFuelCost.textContent = `Petrol cost: $${(vehicle.fuel_cost * 100).toFixed(2)} / km`;
   vehicleCapacity.textContent = vehicle.seats;
   vehicleMileage.textContent = `${vehicle.mileage}k`;
   vehicleTransmission.textContent = vehicle.transmission;
   vehicleDriveType.textContent = vehicle.drive_type;
   vehicleCost.textContent = `$${vehicle.rental_cost}`;
}
