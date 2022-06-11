const dropdownicon = document.getElementById("dropdownarrow");
const signout = document.querySelector(".signout");
const cardoffice = document.querySelector(".cardoffice");
const navopen = document.getElementById("navopen");
const navclose = document.getElementById("navclose");
const sidenav = document.getElementById("navbar");
const closeicontwo = document.getElementById("closeicontwo");
const cardofficebtn = document.getElementById("cardofficebtn")
console.log(cardofficebtn)

//toggling dropdown
dropdownicon.addEventListener("click", (e) => {
  e.preventDefault;
  signout.classList.toggle("display-active");
});

/**opening sidenav on click */
navopen.addEventListener("click", () => {
  sidenav.style.animation = " slidein  0.5s  forwards";
});

/**closing sidenav on click */
navclose.addEventListener("click", () => {
  sidenav.style.animation = " slideout  0.5s forwards";
});

/**removing sidenav on payment popup */
sidenav.addEventListener("click", (e) => {
  if (e.target.classList.contains("payfees")) {
    sidenav.style.animation = " slideout  0.5s forwards";
  }
});

const registerBtn = document.getElementById("registerCourses");
registerPopup = document.getElementById("regPopup");

//closing register popup when close icon is click
const closeicon = document.getElementById("close");
closeicon.addEventListener("click", () => {
  registerPopup.classList.toggle("display-active");
  
});

//w
// const actualBtn = document.getElementById("passport");

// const fileChosen = document.getElementById("file-chosen");

// actualBtn.addEventListener("change", function () {
//   fileChosen.textContent = this.files[0].name;
// });

//closing cardoffice icon


