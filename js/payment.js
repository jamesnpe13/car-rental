console.log(userObject);
function updatePaymentUI() {
   const vehicleImage = document.querySelector(".summary .product-image");
   const vehicleModelText = document.querySelector(".summary .model");
   const vehiclePersonsText = document.querySelector(".summary .persons");
   const daysText = document.querySelector(".summary .days");
   const vehicleRentalCostText = document.querySelector(".summary .rental-cost");
   const vehiclefuelCostText = document.querySelector(".summary .fuel-cost");
   const totalCostText = document.querySelector(".summary .total");

   var rentalCost = parseInt(userObject.selected_vehicle.rental_cost) * parseInt(userObject.filters.days);

   var totalCost = rentalCost + parseInt(userObject.petrol_cost);

   vehicleImage.src = userObject.selected_vehicle.img_url;
   vehicleModelText.textContent = userObject.selected_vehicle.model;
   vehiclePersonsText.textContent = `Number of people: ${userObject.filters.persons}`;
   daysText.textContent = `Number of days: ${userObject.filters.days}`;
   vehicleRentalCostText.textContent = `Rental cost: $${userObject.selected_vehicle.rental_cost * userObject.filters.days}`;
   vehiclefuelCostText.textContent = `Fuel cost: $${userObject.petrol_cost}`;
   totalCostText.textContent = `Total: ${totalCost}`;
}

document.querySelector("#payment-form").addEventListener("submit", (event) => {
   console.log("SUBMIT");
   event.preventDefault();
   document.querySelector(".payment-confirmed-modal").showModal();

   var timer = setTimeout(() => {
      gotoHome();
   }, 3000);

   document.addEventListener("click", gotoHome);

   function gotoHome() {
      document.querySelector(".payment-confirmed-modal").close();
      gotoPage(document.getElementById("login"));
   }
});
