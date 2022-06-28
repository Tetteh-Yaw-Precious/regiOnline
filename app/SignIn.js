const mailField = document.querySelector(".emailfield");
const passwordField = document.querySelector(".passwordfield");
const loginForm = document.querySelector(".loginform");
const loadingAnime = document.getElementById("loadingAnimation");
const alerts = document.querySelector(".alerts");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = mailField.value;
  const password = passwordField.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      auth.onAuthStateChanged(function (currentUser) {
        if (currentUser) {
          console.log(currentUser);
          setTimeout(() => {
            //store email in localstorage
            localStorage.setItem("email", email);
            //redirect to dashboard page
            location.href = "/src/dashboard.html";
          }, 2000);
          alerts.innerHTML = "login successful";
          alerts.style.color = "green";
          alerts.classList.remove("display-none");
          console.log(currentUser);
        }
        loginForm.reset();
      });
    })
    .catch((err) => {
      alerts.innerHTML = err.message;
      alerts.style.color = "red";
      alerts.classList.remove("display-none");
      console.log(err);
    });
});
