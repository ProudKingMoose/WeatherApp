const apikey = "qiFh1fKB1pU1kUbw6FtUOg==vq5q2Inug1ReNehS"
// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
    console.log("HWOHWOWHWOHWO")
    // Prompt user for permission to access their location
    navigator.geolocation.getCurrentPosition(
      // Success callback function
      (position) => {
        console.log(position)
        // Get the user's latitude and longitude coordinates
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        
            fetch("https://api.api-ninjas.com/v1/reversegeocoding?lat=" + lat + "&lon=" + lng,{
                method:'GET',
                headers:{
                    'X-Api-Key': apikey,
                }
            }).then(response => {
                if (!response.ok){
                    throw new Error("Network response didn't work");
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                var city = result[0].name;
                console.log(city);
                document.getElementById("curWeaCity").innerText = "Weather in " + city;
            })
        
        GetDailyData(lng, lat)
        // Do something with the location data, e.g. display on a map
        console.log(`Latitude: ${lat}, longitude: ${lng}`);
      },
      // Error callback function
      (error) => {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }
    );
  } else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }

  function GetDailyData(longitude, latitude){

    console.log(longitude);
    console.log(latitude);

    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weathercode,cloudcover,windspeed_10m,winddirection_10m,windgusts_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&forecast_days=14",{
        method:'GET'
    }).then(response => {
        if (!response.ok){
            throw new Error("Network response didn't work");
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        var temp = result.current.temperature_2m;
        var windspeed = result.current.windspeed_10m;
        var windgusts = result.current.windgusts_10m;
        var precipitation = result.current.precipitation;
        var winddirection = degToCompass(result.current.winddirection_10m);
        document.getElementById("temp").innerText = temp + "C°"
        document.getElementById("wSpeed").innerText = windspeed + "m/s    " + winddirection;
        document.getElementById("percip").innerText = precipitation + " mm";
        console.log(temp);
        console.log(windspeed);
        console.log(windgusts);
        console.log(winddirection);
        getWcode(result.current.weathercode);
    })
}

function getWcode(wCode){
fetch("https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json",{
    method:"GET"
}).then(response => {
    if (!response.ok){
        throw new Error("Network response didn't work");
    }
    return response.json();
})
.then(result =>{
    console.log(result);
    var dsc = result[wCode].day.description;
    var img = result[wCode].day.image;
    document.getElementById("cwpt").innerText = dsc;
    document.getElementById("pwdsc").src = img;
})
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}