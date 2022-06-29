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
        data: [40, 60],
        backgroundColor: ["#7e22ce", "#0fb60c"],
        fontFamily: "Raleway",
      },
    ],
  },
  options: [],
});