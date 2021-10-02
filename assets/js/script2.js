var testCity = "new york, ny"
var newCity = []
var trimCity = ""
var states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "ri", "sc", "sd", "tn", "tx", "ut", "vt", "va", "wa", "wv", "wi", "wy"]
var newArray =[]
if (testCity.includes(",")) {
    testCity = testCity.toLocaleLowerCase()
    newCity = testCity.split(" ")
    for (let i = newCity.length -2; i < newCity.length -1; i++) {
        newCity[i] = newCity[i].slice(0, -1)  
    }
    for (let i = newCity.length -1; i < newCity.length; i++) {
        if (states.includes(newCity[i])) {
            newCity[i] = "us-"+newCity[i].toLocaleLowerCase()
        }
    }
    for (let i = 0; i < newCity.length -1; i++) {
        newArray.push(newCity[i])  
    }
    trimCity = newArray.join(" ")
    for (let i = newCity.length -1; i < newCity.length; i++) {
        trimCity = trimCity + ", " + newCity[i]
    }
}
else {
    trimCity = testCity
}
console.log(trimCity)
console.log(testCity.includes(","))