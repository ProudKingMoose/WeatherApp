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

    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weathercode,windspeed_10m,winddirection_10m,windgusts_10m&windspeed_unit=ms&forecast_days=1",{
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
        var winddirection = degToCompass(result.current.winddirection_10m);
        document.getElementById("temp").innerText = temp + "C°"
        document.getElementById("wSpeed").innerText = windspeed + "m/s    " + winddirection;
        console.log(temp);
        console.log(windspeed);
        console.log(windgusts);
        console.log(winddirection);
    })
}

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}