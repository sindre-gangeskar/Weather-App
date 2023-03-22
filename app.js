var submit = document.getElementById("submit");
var value = document.getElementById("submitValue");
var temp = document.getElementById("tempData");
var desc = document.getElementById("descData");
var feels = document.getElementById("feelsData");
var _name = document.getElementById("name");
var form = document.getElementById("form");
var previousLocation = "";
form.addEventListener("submit", function () {
  try {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value.value},no&lang=no&units=metric&appid=f6d9a84f2131a569011eb0d3107ce0b9`
    )
      .then((response) => {
        if (response.ok) return response.json();
        else if(!response.ok)  _name.innerHTML = "Finner ikke lokasjon";
       
      })
      .then((responseJson) => {
        _name.innerHTML = responseJson["name"];
        temp.innerHTML = responseJson["main"]["temp"] + "℃";
        desc.innerHTML = responseJson["weather"][0]["description"];
        console.log(responseJson)
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


