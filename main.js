const apikey = "qiFh1fKB1pU1kUbw6FtUOg==vq5q2Inug1ReNehS"
const button = document.getElementById("Get-Weather")
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

button.addEventListener("click", ()=>{
    const city = document.getElementById("City").value;
    const country = document.getElementById("Country").value;
    console.log(country)

    fetch("https://api.api-ninjas.com/v1/geocoding?city=" + city + "&country=" + country,{
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

        const longitude = result[0].longitude;
        const latitude = result[0].latitude;

        GetDailyData(longitude, latitude);
    })
})

function GetDailyData(longitude, latitude){

    console.log(longitude);
    console.log(latitude);

    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m",{
        method:'GET'
    }).then(response => {
        if (!response.ok){
            throw new Error("Network response didn't work");
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        var temp = result.current_weather.temperature;
        console.log(temp);
        document.getElementById("temperatureText").innerText = "Current Temperature: " + temp + "°C";
    })
}

function GetHourlyData(longitude, latitude){
    console.log(longitude);
    console.log(latitude);

    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,windspeed_10m,windspeed_80m,windspeed_120m,winddirection_10m,winddirection_80m,winddirection_120m,windgusts_10m,temperature_80m,temperature_120m&forecast_days=1",{
        method:'GET'
    }).then(response => {
        if (!response.ok){
            throw new Error("Network response didn't work");
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
        var temp = result.current_weather.temperature;
        console.log(temp);
        document.getElementById("temperatureText").innerText = "Current Temperature: " + temp + "°C";
    })
}