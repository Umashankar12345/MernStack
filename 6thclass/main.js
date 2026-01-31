function getweather(){

    const  city = document.getElementById("city").ariaValueMax;
        const weatherDiv = document.getElementById("weather");
        const loading = document.getElementById("loading");
        const error = document.getElementById("error");

        if(city === ""){
            alert("please enter a correct city name");
            return;
        }
        loading.innerText = "Loading...";
        error.innerText = "";
        weatherDiv.innerHTML = "";
}


  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then((data) => {
      loading.innerText = "";

      weatherDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].main}</p>
      `;

      saveRecent(city);
      showRecent();
    })
    .catch((err) => {
      loading.innerText = "";
      error.innerText = err.message;
    });

  document.getElementById("cityInput").value = "";


function saveRecent(city) {
  let searches = JSON.parse(localStorage.getItem("recentCities")) || [];

  if (!searches.includes(city)) {
    searches.unshift(city);
  }

  localStorage.setItem("recentCities", JSON.stringify(searches.slice(0, 5)));
}

function showRecent() {
  const recentList = document.getElementById("recent");
  recentList.innerHTML = "";

  let searches = JSON.parse(localStorage.getItem("recentCities")) || [];

  searches.forEach((city) => {
    let li = document.createElement("li");
    li.innerText = city;
    recentList.appendChild(li);
  });
}

showRecent();
