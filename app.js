var submit = document.getElementById("submit");
var value = document.getElementById("submitValue");
var temp = document.getElementById("tempData");
var desc = document.getElementById("descData");
var _name = document.getElementById("name");
var form = document.getElementById("form");
var background = document.getElementById("background");
var background_transition = document.getElementById("background-transition");
var previousLocation = "";

form.addEventListener("submit", function () {
  try {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value.value},lang=en&units=metric&appid=f6d9a84f2131a569011eb0d3107ce0b9`
    )
      .then((response) => {
        if (response.ok) return response.json();
        else if (!response.ok) {
          _name.innerHTML = "Cannot find location";
          temp.innerHTML = "";
          desc.innerHTML = "";
        }
      })
      .then((responseJson) => {
        var tempNumber = Number(responseJson["main"]["temp"]);
        _name.innerHTML =
          responseJson["name"] + ", " + responseJson["sys"]["country"];
        temp.innerHTML = Math.round(tempNumber) + "℃";
        desc.innerHTML = responseJson["weather"][0]["description"];
        console.log(responseJson);
        
        /* Change images based on temperature */
        if (tempNumber < 5) {
            /* Set to winter image */
          SetBackground(0);
        } else if (tempNumber <= 15 && tempNumber >= 5) {
          /* Set to spring image */
          SetBackground(1);
        } else SetBackground(2); /* Set to summer image */
      });
  } catch (error) {
    console.log(error);
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
