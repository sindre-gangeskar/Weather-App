var submit = document.getElementById("submit");
var value = document.getElementById("submitValue");
var temp = document.getElementById("tempData");
var desc = document.getElementById("descData");
var feels = document.getElementById("feelsData");
var _name = document.getElementById("name");
var form = document.getElementById("form");
var background = document.getElementById("background-hidden");
var previousLocation = "";
form.addEventListener("submit", function () {
  try {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value.value},no&lang=no&units=metric&appid=f6d9a84f2131a569011eb0d3107ce0b9`
    )
      .then((response) => {
        if (response.ok) return response.json();
        else if (!response.ok) {
          _name.innerHTML = "Finner ikke lokasjon";
          temp.innerHTML = "";
          desc.innerHTML = "";
        }
      })
      .then((responseJson) => {
        var tempNumber = Number(responseJson["main"]["temp"]);
        _name.innerHTML = responseJson["name"];
        temp.innerHTML = Math.round(tempNumber) + "℃";
        desc.innerHTML = responseJson["weather"][0]["description"];

        if (tempNumber < 5) {
          setTimeout(() => {
            background.style.opacity = 1;
          });
        } else {
          setTimeout(() => {
            background.style.opacity = 0;
          });
        }
        console.log(responseJson);
      });
  } catch (error) {
    console.log(error);
  }

  ResetInput();
  console.log(value.value);
});

function ResetInput() {
  document.getElementById("submitValue").value = "";
}
