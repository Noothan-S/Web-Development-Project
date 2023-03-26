// Here Container refers to Seats
const container = document.querySelector(".container");

//Seats that are not occupied
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const selectedSeatCount = document.getElementById("count");
const totalPriceofTickets = document.getElementById("total");
var movieSelect; // movie That we selected to book
var noOfSeats = 0; // number of Seats that we choose to select
let selectedseatsCount = 0; // number of seat selected /picked
var SeatType; // standard or premium
//var remains = 0;

populateUI();

let ticketPrice = 100;

// Save selected movie index and price
// function setMovieData(movieIndex, moviePrice) {
//   localStorage.setItem("selectedMovieIndex", movieIndex);
//   localStorage.setItem("selectedMoviePrice", moviePrice);
// }

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  couselectedSeatCount.innerText = selectedSeatsCount;
  tototalPriceofTickets.innerText = selectedSeatsCount * ticketPrice;
  // return selectedSeatsCount;

  //setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const urlParams = new URLSearchParams(window.location.search);
  var movieName = urlParams.get("name");
  var moviesList = document.getElementById("defaultMovie");
  moviesList.innerHTML = movieName;
  movieSelect = movieName;

  var selectedSeats = JSON.parse(
    localStorage.getItem("selectedSeatsstandard" + movieSelect)
  );
  const premiumseats = JSON.parse(
    localStorage.getItem("selectedSeatspremium" + movieSelect)
  );
  // const selectedSeats=[]
  try {
    selectedSeats = selectedSeats.concat(premiumseats);
  } catch {
    //nothing...
  }

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("occupied");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  // if (selectedMovieIndex !== null) {
  //   movieSelect.selectedIndex = selectedMovieIndex;
  // }
}

// Movie select event
// movieSelect.addEventListener('change', e => {
//   ticketPrice = +e.target.value;
//   setMovieData(e.target.selectedIndex, e.target.value);
//   updateSelectedCount();
// });

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    var seatNo = e.target.id;
    if (selectedseatsCount == noOfSeats) {
      //for(var i=no;i<total;i++){
      Array.from(document.getElementsByClassName("selected")).forEach(function (
        element
      ) {
        // Use `element` here
        element.classList.remove("selected");
        selectedseatsCount = 0;
      });
    }

    var total = parseInt(seatNo) + parseInt(noOfSeats) - selectedseatsCount;

    for (var i = no; i < total; i++) {
      // e.target.classList.toggle('selected');
      if (document.getElementById(i).classList.contains("occupied")) {
        total++;
        continue;
      }
      if (
        SeatType === "standard" &&
        document.getElementById(i).closest(".premium")
      ) {
        remains = total - i;
        break;
      }
      document.getElementById(i).classList.toggle("selected");
      ++selectedseatsCount;
    }
    var total = updateSelectedCount();
  }
});

function Save() {
  let selectedSeats = document.getElementsByClassName("selected");
  Array.from(document.getElementsByClassName("selected")).forEach(function (
    element
  ) {
    // Use `element` here
    element.classList.add("occupied");
    element.classList.remove("selected");
  });

  const selectedSeat = document.querySelectorAll(
    "." + SeatType + " .row .seat.occupied"
  );

  const seatsIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
  const seatsTypes = "selectedSeats" + SeatType + movieSelect;
  localStorage.setItem(seatsTypes, JSON.stringify(seatsIndex));
  window.open("./index.html", "_self");
}

// Initial count and total set

// function setSeat(){
//   noOfSeats=document.getElementsByName('cnt')[0].value;
//   //noOfSeats=val.value;
//   alert(noOfSeats);
// }

function openPopup(movieName) {
  window.open("./tickets.html?name=" + movieName, "_self");
}

function closePopup() {
  window.open("./index.html", "_self");
}

function SetValues() {
  noOfSeats = document.getElementsByName("noOfSeats")[0].value;
  if (noOfSeats > 10) {
    document.getElementById("max").style.display = "block";
    return;
  }
  if (document.getElementsByName("type")[1].checked) {
    document.getElementsByClassName("standard")[0].style.pointerEvents = "none";
    document.getElementsByClassName("standard")[0].style.backgroundColor =
      "grey";
    SeatType = "premium";
  } else {
    document.getElementsByClassName("premium")[0].style.pointerEvents = "none";
    document.getElementsByClassName("premium")[0].style.backgroundColor =
      "grey";
    SeatType = "standard";
  }

  document.getElementById("test").style.display = "none";
}

function ticketPage() {
  document.getElementById("test").style.display = "block";
  
  let premiumseatOccupied = JSON.parse(
    localStorage.getItem("selectedSeatspremium" + movieSelect)
  ).length;
  let totalpremiumseat = document.querySelectorAll(
    ".premium .row .seat"
  ).length;
  let standardseatOccupied = JSON.parse(
    localStorage.getItem("selectedSeatsstandard" + movieSelect)
  ).length;
  let totalstandardseat = document.querySelectorAll(
    ".standard .row .seat"
  ).length;

  if (premiumseatOccupied >= totalpremiumseat) {
    document.getElementById("prm").disabled = true;
  }
  if (standardseatOccupied >= totalstandardseat) {
    document.getElementById("std").disabled = true;
  }
}
updateSelectedCount();
