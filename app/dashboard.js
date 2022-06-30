//retrieve the email stored in localstorage
const email = localStorage.getItem("email");
const loadingAnime = document.getElementById("loadingAnimation");
const payFeesBtn = document.getElementById("payfees");
const proceedToPayment = document.getElementById("proceed");
const payfeepopup = document.getElementById("paymentPopup");
const amountForm = document.getElementById("amountform");
const regpopupform = document.getElementById("regpopupform");
const imageupload = document.getElementById("imageupload-js");
const dateforcollection = document.getElementById("dateforcollection");
const message = document.getElementById("message");

let data;
let Totalfees;
let count;

//loading animation
const loadingcircle = () => {
  setTimeout(() => {
    document.getElementById("loading").style.borderRight = "5px solid #ffffff";
  }, 100);
  setTimeout(() => {
    document.getElementById("loading").style.borderBottom = "5px solid #fffff";
  }, 200);
};

auth.onAuthStateChanged((user) => {
  //if the user has signed in, go ahead and get the user data from the database
  if (user) {
    //getting counter for student index numbers and flutterwave tx_ref
    // db.collection("User_Data")
    //   .doc("student_index")
    //   .onSnapshot((doc) => {
    //     data = doc.data();
    //     localStorage.setItem("localStorageCounter", data.counter);
    //     count = localStorage.getItem("localStorageCounter");
    //   });

    /**go to the User_Data collection where email is equal
     * to the email retrieved from localstorage*/

    db.collection("User_Data")
      .doc("GVGNNXOkRNSWEhFOUXRFQFjGfB42")
      .onSnapshot((doc) => {
        data = doc.data();
        // doc.set({firstname: "man"});
        //setting localStorage data
        //get their ids and insert the data into them
        document.getElementById("dob").innerHTML = data.dob;
        document.getElementById(
          "firstName1"
        ).innerHTML = `${data.firstname}/${data.indexnumber}/${data.studStatus}`;
        document.getElementById("firstName2").innerHTML = data.firstname;
        document.getElementById("lastName2").innerHTML = data.lastname;
        document.getElementById("otherName").innerHTML = data.othername;
        document.getElementById("sex").innerHTML = data.sex;
        document.getElementById("pob").innerHTML = data.pob;
        document.getElementById("nationality").innerHTML = data.nationality;
        document.getElementById("programSession").innerHTML =
          data.programsession;
        document.getElementById("tel").innerHTML = data.Tel;
        document.getElementById("eduBackground").innerHTML = data.edubackground;
        document.getElementById("tel").innerHTML = data.Tel;
        document.getElementById("resultSlip").innerHTML = data.resultslip;
        document.getElementById("residencialAddress").innerHTML =
          data.residentialaddress;
        document.getElementById("fatherName").innerHTML = data.fathername;
        document.getElementById("fatherOcc").innerHTML = data.fatherocc;
        document.getElementById("motherName").innerHTML = data.mothername;
        document.getElementById("motherOcc").innerHTML = data.motherocc;
        document.getElementById("admissionYear").innerHTML = data.admissionyear;
        document.getElementById("completionYear").innerHTML =
          data.completionyear;
        document.getElementById("department").innerHTML = data.department;
        document.getElementById("programme").innerHTML = data.programme;
        document.getElementById("resultSlip").innerHTML = data.resultslip;
        document.getElementById("resultSlip").innerHTML = data.resultslip;
        document.getElementById("totalfees").innerHTML = data.totalfees;
        document.getElementById("paidfees").innerHTML = data.paidfees;

        //building doughnut
        let moneyGraph = document.getElementById("moneyGraph").getContext("2d");
        Chart.defaults.font.size = 12;
        Chart.defaults.font.family = "Raleway,sans-serif";
        Chart.defaults.cutOut = 49;
        let massPopChart = new Chart(moneyGraph, {
          type: "doughnut",
          data: {
            labels: ["remaining balance", "paid"],
            datasets: [
              {
                label: "Population",
                data: [data.totalfees - data.paidfees, data.paidfees],
                backgroundColor: ["#7e22ce", "#0fb60c"],
                fontFamily: "Raleway",
              },
            ],
          },
          options: [],
        });

        localStorage.setItem("Tel", data.Tel);
        localStorage.setItem("name", `${data.firstname} ${data.lastname}`);
        localStorage.setItem("Totalfees", data.totalfees);
        Totalfees = data.totalfees;

        //integrating flutterwave payment methods
        payFeesBtn.addEventListener("click", () => {
          if (payfeepopup.classList.contains("display-active")) {
            payfeepopup.classList.remove("display-active");
          }
        });

        //we are checking to see what 60% of the overrall fees is
        calculatingfeespercentage = () => {
          let requiredpercentage = (60 / 100) * Totalfees;

          /**after checking to find out the what 60% is now we are we going to
           * see if the paid fees is >= to 60% of the total fees*/

          if (data.paidfees >= requiredpercentage) {
            console.log(data.paidfees);
            document.getElementById("pfeesh6").style.color = "#0fb60c";
            document.getElementById("paidfees").style.color = "#0fb60c";
            document.getElementById("paid").style.color = "#0fb60c";
            registerBtn.disabled = false;
            //registering courses popup
            registerBtn.style.backgroundColor = "#0fb60c";
            registerBtn.addEventListener("click", () => {
              registerPopup.classList.remove("display-active");
            });
          } else {
            console.log(false);
            document.getElementById("pfeesh6").style.color = "#f45110";
            document.getElementById("paidfees").style.color = "#f45110";
            document.getElementById("paid").style.color = "#f45110";
            registerBtn.disabled = true;
            registerBtn.style.backgroundColor = "#c4c4c4";
          }
        };
        calculatingfeespercentage();
        if (data !== null) {
          loadingcircle();
        }
        setTimeout(() => {
          loadingAnime.classList.add("display-active");
        }, 300);

        if (data.studStatus !== "null") {
          closeicontwo.addEventListener("click", (e) => {
            cardoffice.classList.add("display-active");
          });
          closeicontwo.addEventListener("click", (e) => {
            cardoffice.classList.add("display-active");
          });
          cardofficebtn.addEventListener("click", (e) => {
            cardoffice.classList.remove("display-active");
            var dt = new Date();
            dt.setDate(dt.getDate() + 2);
            console.log(dt);
            message.textContent = `Dear ${data.firstname} your student 
            card would be ready on:`;
            dateforcollection.textContent = dt;
          });
          registerBtn.disabled = true;
        }

        const pkey = "FLWPUBK_TEST-bb162b39298e644e1f022c070ca2ad05-X";
        const makePayments = (e) => {
          e.preventDefault();
          let amountvalue = document.getElementById("inputamount").value;

          FlutterwaveCheckout({
            public_key: pkey,
            tx_ref: `04/2018/29${count < 10 ? "0" + count++ : count++}D`,
            amount: amountvalue,
            currency: "GHS",
            country: "GH",
            payment_options: "card,mobile_money_ghana",
            // redirect_url: "../src/dashboard.html",
            customer: {
              email: `${localStorage.getItem("email")}`,
              phone_number: `${localStorage.getItem("Tel")}`,
              name: `${localStorage.getItem("name")}`,
            },
            callback: function (data) {
              if (data.status == "successful") {
                let updatefees =
                  firebase.firestore.FieldValue.increment(amountvalue);
                let updateIndexcounter =
                  firebase.firestore.FieldValue.increment(count++);
                console.log(updatefees);
                db.collection("User_Data").doc(user.uid).update({
                  paidfees: updatefees,
                  indexnumber: data.tx_ref,
                });
                db.collection("User_Data").doc("student_index").update({
                  counter: updateIndexcounter,
                });
              }
              massPopChart.destroy();
              sidenav.style.animation = " slidein  0.2s forwards";
              calculatingfeespercentage();
            },
            onclose: function () {
              payfeepopup.classList.add("display-active");
            },
            customizations: {
              title: "School fees",
              description: "Payment of school fees",
              logo: "../assets/logo.png",
            },
          });
        };
        amountForm.addEventListener("submit", makePayments);
      });
    regpopupform.addEventListener("submit", (e) => {
      console.log(e.target);
      e.preventDefault();

      const file = imageupload.files[0];
      const name = data.firstname;
      const metadata = {
        contentType: file.type,
      };
      const postingimage = storage.child(name).put(file, metadata);
      postingimage
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          db.collection("User_Data").doc(user.uid).update({
            imgURL: url,
            studStatus: "active",
          });
        });
    });
  }
});

/**signing users out of the dashboard, clearing
 * localStorage and redirecting the user back to the homepage
 */
signout.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signOut()
    .then((user) => {
      if (user == null) {
        localStorage.clear();
        location.href = "/index.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const mediaQuery = window.matchMedia("(min-width: 600px)");
// Check if the media query is true

amountForm.addEventListener("click", (e) => {
  e.preventDefault;
  if (e.target.classList.contains("close")) {
    //removing popup window
    payfeepopup.classList.add("display-active");
    if (window.innerWidth > 600) {
      sidenav.style.animation = " slidein  0.2s forwards";
    }
  }

  //registration popup
});
