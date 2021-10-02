var searchCity = "new york, us-ny"
var stateCity = []
var newTrim = ""
var states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"]
var stateArray =[]
var newArray = []

cityState()

function cityState() {
    if (searchCity.includes(",")) {
        searchCity = searchCity.toLocaleLowerCase()
        stateCity = searchCity.split(" ")
        for (let i = stateCity.length -2; i < stateCity.length -1; i++) {
            stateCity[i] = stateCity[i].slice(0, -1)  
        }
        for (let i = stateCity.length -1; i < stateCity.length; i++) {
            if (states.includes(stateCity[i])) {
                stateCity[i] = "us-"+stateCity[i].toLocaleLowerCase()
            }
        }
        for (let i = 0; i < stateCity.length -1; i++) {
            stateArray.push(stateCity[i])  
        }
        newTrim = stateArray.join(" ")
        for (let i = stateCity.length -1; i < stateCity.length; i++) {
            newTrim = newTrim + ", " + stateCity[i]
        }
        searchCity = newTrim
    }
    storeData()
}

function storeData() {
    var trimCity = searchCity.toLowerCase()
    var newCity = trimCity.split(" ")
    for (let i = 0; i < newCity.length; i++) {
        newCity[i] = newCity[i].charAt(0).toUpperCase() + newCity[i].slice(1)
    }
    newCityTwo = newCity.join(" ")
    newArray.push(newCityTwo)
    if (newArray.length > 5) {
        for (let i = newArray.length; i > 5; i--) {
            newArray.shift()            
        }
    }
    // localStorage.setItem("newList", JSON.stringify(newArray))
}

console.log(newArray)
console.log(searchCity)
console.log(searchCity.includes(","))
console.log(!searchCity.includes("us-"))