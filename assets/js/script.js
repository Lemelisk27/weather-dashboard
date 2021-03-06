//Sets variables
var APIKey = "e5dea1d1c3f38ea6d30bc512279c3257"
var searchCity = ""
var queryURL = ""
var input
var city = $("#cityDate")
var temp = $("#currentTemp")
var currentWind = $("#currentWind")
var currentHumid = $("#currentHumid")
var uvIndex = $(".uvIndex")
var uvNbr = $("#uvNbr")
var fiveDays = $("#fiveDays")
var searchBtn = $("#searchBtn")
var cityInput = $("#cityInput")
var searchBox = $("#searchBox")
var secondBox = $("#secondBox")
var cityName = ""
var lat = ""
var lon = ""
var loaded = false
var newCityTwo = ""
var newArray = []
var stateCity = []
var newTrim = ""
var states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"]
var capStates = states.join(",")
capStates = capStates.toLocaleUpperCase()
var capStatesArray = capStates.split(",")
var stateArray =[]

//Pulls data from local storage, deletes any history buttons that might be on the page. And creates new history buttons in reverse order so the latest one is at the top.
function init() {
    var storedData = JSON.parse(localStorage.getItem("newList"))
    if (storedData !== null) {
        newArray = storedData
    }
    if (newArray.length > 0) {
        for (let i = 0; i < 8; i++) {
            var delBtn = $("#historyBtn" + [i])
            delBtn.remove()
        }
        for (let i = newArray.length - 1; i > -1; i--) {
            var newBtn = document.createElement("button")
            newBtn.classList.add("historyBtn")
            newBtn.setAttribute("id", "historyBtn" + [i])
            newBtn.innerHTML = newArray[i]
            secondBox.append(newBtn)
        }
    }
}

init()

//Stores the last 8 searches to local storage. Does NOT include the search if it's already on the list.
function storeData() {
    searchCity = searchCity.replace("US-", "")
    if (!newArray.includes(searchCity)) {
        newArray.push(searchCity)
    }
    if (newArray.length > 8) {
        for (let i = newArray.length; i > 8; i--) {
            newArray.shift()            
        }
    }
    localStorage.setItem("newList", JSON.stringify(newArray))
}

//If data has aleady been loaded this function removes the 5 day forecast cards.
function removeData() {
    if (!loaded) {
        return;
    }
    else {
        for (let i = 1; i < 6; i++) {
            var dayCard = $("#dayCard" + [i])
            dayCard.remove()            
        }
    }
}

//Function to pull the data from the APIs, parse it, and apply it to the page.
function getData() {
    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                alert("Unable to connect to 3rd party site, please relaod the page.")
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
                    alert("Unable to connect to 3rd party site, please relaod the page.")
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
                    dayCard.setAttribute("id", "dayCard" + [i])
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

//Event listener for when the user clicks on a button
secondBox.on("click", function (event){
    event.preventDefault()
    if (event.target.innerHTML === "Search") {
        searchCity = cityInput.val()
    }
    else {
        searchCity = event.target.innerHTML
    }    
    if (searchCity.includes(",") && !searchCity.includes("us-") && !searchCity.includes("US-")) {
        searchCity = searchCity.toUpperCase()
        stateCity = searchCity.split(" ")
        for (let i = stateCity.length -2; i < stateCity.length -1; i++) {
            stateCity[i] = stateCity[i].slice(0, -1)
        }
        for (let i = stateCity.length -1; i < stateCity.length; i++) {
            if (capStatesArray.includes(stateCity[i]) || states.includes(stateCity[i])) {
                stateCity[i] = "US-"+stateCity[i].toUpperCase()
            }
        }
        for (let i = 0; i < stateCity.length -1; i++) {
            stateCity[i] = stateCity[i].toLowerCase()
            stateCity[i] = stateCity[i].charAt(0).toUpperCase() + stateCity[i].slice(1) 
            stateArray.push(stateCity[i])  
        }
        newTrim = stateArray.join(" ")
        for (let i = stateCity.length -1; i < stateCity.length; i++) {
            newTrim = newTrim + ", " + stateCity[i]
        }
        searchCity = newTrim
        stateCity = []
        stateArray = []
    }
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=" + APIKey;
    cityInput.val("")
    removeData()
    loaded = true
    getData()
    storeData()
    init()
})

//Submits the request if the user hits the enter key.
cityInput.on("keyup", function (event){
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click()
    }
})