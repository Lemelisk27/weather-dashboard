var searchCity = "new york, us-ny"
var stateCity = []
var newTrim = ""
var states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"]
var capStates = states.join(",")
capStates = capStates.toLocaleUpperCase()
var capStatesArray = capStates.split(",")
var stateArray =[]
var newArray = []

cityState()

function cityState() {
    if (searchCity.includes(",")) {
        searchCity = searchCity.toUpperCase()
        stateCity = searchCity.split(" ")
        for (let i = stateCity.length -2; i < stateCity.length -1; i++) {
            stateCity[i] = stateCity[i].slice(0, -1)
        }
        for (let i = stateCity.length -1; i < stateCity.length; i++) {
            console.log(capStatesArray.includes(stateCity[i]) || states.includes(stateCity[i]))
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
    }
}

// console.log(newArray)
console.log(searchCity)
// console.log(searchCity.includes(","))
// console.log(!searchCity.includes("us-"))