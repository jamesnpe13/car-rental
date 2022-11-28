const addWaypointButton = document.querySelector(".add-waypoint-button");
const waypointInput = document.querySelector(".map-input-text");

// user input object
var userInput = {
   startend: "",
   waypoints: [],
};

// map init config
const mapConfig = {
   zoom: 14,
   center: { lat: -36.84930376317681, lng: 174.76438841408702 },
   disableDefaultUI: true,
   draggable: false,
};

// initialize map API
function initMap() {
   const map = new google.maps.Map(document.getElementById("map"), mapConfig);
}

//show add button when waypoint input value == true || > length 0

waypointInput.addEventListener("input", (e) => {
   if (validateInput(e)) {
      addWaypointButton.classList.remove("hidden");
   } else {
      addWaypointButton.classList.add("hidden");
   }
});

// validate input
function validateInput(e) {
   if (e.target.value.length > 0 && e.target.value) {
      return true;
   } else {
      return false;
   }
}

// waypoint add

addWaypointButton.addEventListener("click", addWaypoint);

function addWaypoint() {
   createWaypointElement();
   pushWaypointToUserInput();
   waypointInput.value = "";
   addWaypointButton.classList.add("hidden");
   console.table(userInput.waypoints);
}

// create waypoint element
function createWaypointElement() {
   const waypointContainer = document.querySelector(".waypoint-container");

   if (waypointInput.value) {
      var wpDiv = document.createElement("div");
      var wpSpan = document.createElement("span");
      var wpRemoveDiv = document.createElement("div");
      var wpRemoveIcon = document.createElement("i");

      wpDiv.className = "map-waypoint user";
      wpRemoveDiv.className = "remove-waypoint-button";
      wpRemoveDiv.setAttribute("onclick", "removeWaypoint(event)");
      wpRemoveIcon.className = "fa-solid fa-trash";

      waypointContainer.appendChild(wpDiv);
      wpDiv.appendChild(wpSpan);
      wpDiv.appendChild(wpRemoveDiv);
      wpRemoveDiv.appendChild(wpRemoveIcon);

      wpSpan.textContent = waypointInput.value;
      wpDiv.setAttribute("data-id", waypointInput.value);
   }
}

// waypoint remove
function removeWaypoint(event) {
   var wpArray = userInput.waypoints;
   var wpElement = event.target.closest(".user");

   for (i = 0; i < wpArray.length; i++) {
      var location = wpArray[i].location;

      if (location == wpElement.getAttribute("data-id")) {
         // splice userinput array item
         wpArray.splice(i, 1);
         // remove element
         event.target.closest(".user").remove();
      }
   }
   console.table(userInput.waypoints);
}

// push user input
function pushWaypointToUserInput() {
   var waypointObject = {
      stopover: true,
   };
   waypointObject.location = waypointInput.value;
   userInput.waypoints.push(waypointObject);
}
