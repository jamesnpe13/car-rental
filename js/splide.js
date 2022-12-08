var splide;

document.addEventListener("itemCardsCreate", function () {
   initSplide();
   updateDescription();
});

function initSplide() {
   splide = new Splide(".splide", {
      type: "loop",
      padding: "5rem",
   });
   var bar = splide.root.querySelector(".my-carousel-progress-bar");

   // Updates the bar width whenever the carousel moves:
   splide.on("mounted move", function () {
      var end = splide.Components.Controller.getEnd() + 1;
      var rate = Math.min((splide.index + 1) / end, 1);
      bar.style.width = String(100 * rate) + "%";
   });

   splide.mount();
   displayDescription(0);
}

function updateDescription() {
   splide.on("move", function (slide) {
      displayDescription(slide);
   });
}

function displayDescription(slide) {
   var allVehiclesArray = filterMatchArray;
   var allCardItems = itemCardContainer.querySelectorAll(".item-card");
   const textContainer = document.querySelector("#vehicles .text-container");
   const modelText = document.querySelector("#vehicles .text-container .model");
   const classText = document.querySelector("#vehicles .text-container .class");
   const costText = document.querySelector("#vehicles .text-container .cost");

   userObject.selected_vehicle = allVehiclesArray[slide];

   var timer;

   clearTimeout(timer);
   textContainer.classList.add("hidden");

   timer = setTimeout(() => {
      for (var item of allCardItems) {
         if (item.getAttribute("data-id") == allVehiclesArray[slide].vehicle_id) {
            modelText.textContent = allVehiclesArray[slide].model;
            classText.textContent = allVehiclesArray[slide].class;
            costText.textContent = "$" + allVehiclesArray[slide].rental_cost;
            textContainer.classList.remove("hidden");
         }
      }
   }, 200);
}
