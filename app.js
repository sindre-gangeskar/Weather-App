var submit = document.getElementById("submit");
var value = document.getElementById("submitValue");
var tempData = document.getElementById("tempData");
var descData = document.getElementById("descData");
var nameData = document.getElementById("nameData");
var form = document.getElementById("form");
var background = document.getElementById("background");
var background_transition = document.getElementById("background-transition");

form.addEventListener("submit", function () {
  if (value.value != "") {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value.value},lang=en&units=metric&appid=f6d9a84f2131a569011eb0d3107ce0b9`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            nameData.innerHTML = "Cannot find location";
            tempData.innerHTML = "";
            descData.innerHTML = "";
          }
        })
        .then((responseJson) => {
          var tempNumber = Number(responseJson["main"]["temp"]);
          const capital = responseJson["name"].charAt(0).toUpperCase();
          const lowerCase = responseJson["name"].slice(1);

          nameData.innerHTML = `${capital}${lowerCase}, ${responseJson["sys"]["country"]}`;

          tempData.innerHTML = Math.round(tempNumber) + "℃";
          descData.innerHTML = responseJson["weather"][0]["description"];
          console.log(responseJson);

          tempNumber < 5
            ? SetBackground(0)
            : tempNumber <= 15 && tempNumber > 5
            ? SetBackground(1)
            : SetBackground(2);
        });
    } catch (error) {
      console.log(error);
    }
  }

  ResetInput();
});

function ResetInput() {
  document.getElementById("submitValue").value = "";
}
function SetBackground(index) {
  let imgs = [
    "/imgs/ghibli_winter.png",
    ["/imgs/ghibli_spring.png"],
    ["/imgs/ghibli_summer.png"],
  ];
  background_transition.src = imgs[index].valueOf(index);
  background_transition.style.opacity = 1;

  setTimeout(() => {
    background.src = imgs[index].valueOf(index);
    background_transition.style.opacity = 0;
  }, 300);
}
