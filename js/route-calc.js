/*====================================================================
                     VARIABLES
====================================================================*/
const addWaypointButton = document.querySelector(".add-waypoint-button");
const waypointInput = document.querySelector(".map-input-text");
var directionsService;
var directionsRenderer;

// user input object
var userInput = {
   startend: { lat: -36.85661263528437, lng: 174.76305498460852 },
   waypoints: [],
};

// map init config
const mapConfig = {
   zoom: 14,
   center: { lat: -36.84930376317681, lng: 174.76438841408702 },
   disableDefaultUI: true,
   draggable: false,
   styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
         featureType: "administrative.locality",
         elementType: "labels.text.fill",
         stylers: [{ color: "#d59563" }],
      },
      {
         featureType: "poi",
         elementType: "labels.text.fill",
         stylers: [{ color: "#d59563" }],
      },
      {
         featureType: "poi.park",
         elementType: "geometry",
         stylers: [{ color: "#263c3f" }],
      },
      {
         featureType: "poi.park",
         elementType: "labels.text.fill",
         stylers: [{ color: "#6b9a76" }],
      },
      {
         featureType: "road",
         elementType: "geometry",
         stylers: [{ color: "#38414e" }],
      },
      {
         featureType: "road",
         elementType: "geometry.stroke",
         stylers: [{ color: "#212a37" }],
      },
      {
         featureType: "road",
         elementType: "labels.text.fill",
         stylers: [{ color: "#9ca5b3" }],
      },
      {
         featureType: "road.highway",
         elementType: "geometry",
         stylers: [{ color: "#746855" }],
      },
      {
         featureType: "road.highway",
         elementType: "geometry.stroke",
         stylers: [{ color: "#1f2835" }],
      },
      {
         featureType: "road.highway",
         elementType: "labels.text.fill",
         stylers: [{ color: "#f3d19c" }],
      },
      {
         featureType: "transit",
         elementType: "geometry",
         stylers: [{ color: "#2f3948" }],
      },
      {
         featureType: "transit.station",
         elementType: "labels.text.fill",
         stylers: [{ color: "#d59563" }],
      },
      {
         featureType: "water",
         elementType: "geometry",
         stylers: [{ color: "#17263c" }],
      },
      {
         featureType: "water",
         elementType: "labels.text.fill",
         stylers: [{ color: "#515c6d" }],
      },
      {
         featureType: "water",
         elementType: "labels.text.stroke",
         stylers: [{ color: "#17263c" }],
      },
   ],
};

// auto complete config
const autocompleteConfig = {
   componentRestrictions: { country: "NZ" },
   fields: ["address_components", "geometry", "icon", "name"],
   strictBounds: false,
   types: [],
};
/*====================================================================
                     INIT
====================================================================*/

// initialize map API
function initMap() {
   const map = new google.maps.Map(document.getElementById("map"), mapConfig);
   const autocomplete = new google.maps.places.Autocomplete(waypointInput, autocompleteConfig);
   directionsService = new google.maps.DirectionsService();
   directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: false,
      suppressMarkers: true,
      polylineOptions: {
         strokeColor: "#cfff55",
         strokeOpacity: 1.0,
         strokeWeight: 5,
      },
   });
   directionsRenderer.setMap(map);
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

// hide dropdown on scroll
const inputContainer = document.querySelector(".map-input-container");
inputContainer.addEventListener("scroll", () => {
   var dropdown = document.querySelector(".pac-container");
   dropdown.style.display = "none";
});

/*====================================================================
                     WAYPOINTS
====================================================================*/

// waypoint add
addWaypointButton.addEventListener("click", addWaypoint);

function addWaypoint() {
   const waypointContainer = document.querySelector(".waypoint-container");

   if (waypointInput.value) {
      // create waypoint element
      var wpDiv = document.createElement("div");
      var wpSpan = document.createElement("span");
      var wpRemoveDiv = document.createElement("div");
      var wpRemoveIcon = document.createElement("i");
      var wpUid = window.crypto.randomUUID();

      wpDiv.className = "map-waypoint user";
      wpRemoveDiv.className = "remove-waypoint-button";
      wpRemoveDiv.setAttribute("onclick", "removeWaypoint(event)");
      wpRemoveIcon.className = "fa-solid fa-trash";

      waypointContainer.appendChild(wpDiv);
      wpDiv.appendChild(wpSpan);
      wpDiv.appendChild(wpRemoveDiv);
      wpRemoveDiv.appendChild(wpRemoveIcon);

      wpSpan.textContent = waypointInput.value;
      wpDiv.setAttribute("data-id", wpUid);

      // push waypoint to userinput object
      var waypointObject = {
         stopover: true,
         location: waypointInput.value,
         uid: wpUid,
      };

      userInput.waypoints.push(waypointObject);

      // reset button
      waypointInput.value = "";
      addWaypointButton.classList.add("hidden");

      // calculate distance and render UI
      calcDistance();

      // log userinput object
      console.log(userInput);
   }
}

// waypoint remove
function removeWaypoint(event) {
   var wpArray = userInput.waypoints;
   var wpElement = event.target.closest(".user");

   for (i = 0; i < wpArray.length; i++) {
      var locationID = wpArray[i].uid;

      if (locationID == wpElement.getAttribute("data-id")) {
         // splice userinput array item
         wpArray.splice(i, 1);
         // remove element
         event.target.closest(".user").remove();
      }
   }

   // calculate distance and render UI
   calcDistance();

   // log userinput object
   console.log(userInput);
}

/*====================================================================
                     ROUTE CALC 
====================================================================*/

function calcDistance() {
   var waypointsArray = [];
   for (var item of userInput.waypoints) {
      var waypointObj = {
         location: item.location,
         stopover: item.stopover,
      };

      waypointsArray.push(waypointObj);
   }
   directionsService
      .route({
         origin: userInput.startend,
         destination: userInput.startend,
         waypoints: waypointsArray,
         optimizeWaypoints: false,
         unitSystem: google.maps.UnitSystem.METRIC,
         avoidTolls: false,
         avoidFerries: true,
         travelMode: google.maps.TravelMode.DRIVING,
         region: "NZ",
      })
      .then((response) => {
         console.log(response);
         updateMapUI(response);
      });
}

function updateMapUI(response) {
   const totalDistanceDisplay = document.querySelector(".total-distance");
   var routeLegsArray = response.routes[0].legs;
   var totalDistance = 0;
   var totalDistanceText;
   for (var leg of routeLegsArray) {
      totalDistance += leg.distance.value;
      totalDistanceText = (totalDistance / 1000).toFixed(0) + "km";
   }
   totalDistanceDisplay.textContent = totalDistanceText;
   directionsRenderer.setDirections(response);

   // update cost text
   const totalCostDisplay = document.querySelector(".total-fuel-cost");
   var totalFuelCost = ((totalDistance / 1000) * userObject.selected_vehicle.fuel_cost).toFixed(0);
   console.log(totalDistance);
   console.log(userObject.selected_vehicle.fuel_cost);
   userObject.petrol_cost = totalFuelCost;
   totalCostDisplay.textContent = `$${userObject.petrol_cost}`;
}

document.querySelector("#payment-button").addEventListener("click", () => {
   updatePaymentUI();
});
