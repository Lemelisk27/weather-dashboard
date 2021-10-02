//Sets variables
var APIKey = "e5dea1d1c3f38ea6d30bc512279c3257"
var city = "seattle,us-wa"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
var city = $("#cityDate")
var temp = $("#currentTemp")
var currentWind = $("#currentWind")
var currentHumid = $("#currentHumid")
var uvIndex = $(".uvIndex")
var uvNbr = $("#uvNbr")
var fiveDays = $("#fiveDays")
var cityName
var lat
var lon

getData()

//Function to pull the data from the APIs, parse it, and apply it to the page.
function getData() {
    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                return;
            }
            else {
                return response.json();
            }
        })
        .then(function (data) {
            cityName = data.name
            lat = data.coord.lat
            lon = data.coord.lon
        })
        .then(function () {
            var secondURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKey;
            fetch(secondURL)
            .then(function (response) {
                if (!response.ok) {
                    return;
                }
                else {
                    return response.json()
                }
            })
            .then(function (newData) {
                city.text(cityName + " (" + moment.unix(newData.current.dt).format("M/D/YYYY") + ")")
                var currentIcon = document.createElement("img")
                currentIcon.src = "https://openweathermap.org/img/w/" + newData.current.weather[0].icon + ".png"
                city.append(currentIcon)
                temp.text("Temp: " + newData.current.temp + " F")
                currentWind.text("Wind: " + newData.current.wind_speed + " MPH")
                currentHumid.text("Himidity: " + newData.current.humidity + "%")
                uvIndex.text("UV Index:")
                uvNbr.text(newData.current.uvi)
                if (newData.current.uvi <= 2) {
                    uvNbr.css("background-color", "var(--uvGreen)")
                    uvNbr.css("color", "var(--lightText)")
                }
                else if (newData.current.uvi >= 6) {
                    uvNbr.css("background-color", "var(--uvRed)")
                    uvNbr.css("color", "var(--lightText)")
                }
                else {
                    uvNbr.css("background-color", "var(--uvYellow)")
                }
                for (let i = 1; i < 6; i++) {
                    var dayCard = document.createElement("span")
                    dayCard.classList.add("dayCard")
                    fiveDays.append(dayCard)
                    var dayDate = document.createElement("h3")
                    dayCard.append(dayDate)
                    dayDate.innerHTML = moment.unix(newData.daily[i].dt).format("M/D/YYYY")
                    var newIcon = document.createElement("img")
                    newIcon.src = "https://openweathermap.org/img/w/" + newData.daily[i].weather[0].icon + ".png"
                    dayCard.append(newIcon)
                    var dayTemp = document.createElement("p")
                    dayTemp.innerHTML = "Temp: " + newData.daily[i].temp.day + " F"
                    dayCard.append(dayTemp)
                    var dayWind = document.createElement("p")
                    dayWind.innerHTML = "Wind: " + newData.daily[i].wind_speed + " MPH"
                    dayCard.append(dayWind)
                    var dayHumid = document.createElement("p")
                    dayHumid.innerHTML = "Humidity: " + newData.daily[i].humidity + "%"
                    dayCard.append(dayHumid)
                }             
            })
        })
}