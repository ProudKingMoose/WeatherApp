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

    fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weathercode,cloudcover,windspeed_10m,winddirection_10m,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto&forecast_days=14",{
        method:'GET'
    }).then(response => {
        if (!response.ok){
            throw new Error("Network response didn't work");
        }   
        return response.json();
    })
    .then(result => {
        console.log(result);
        for(var i = 0; i < 14; i++){

            for (var i = 0; i < 24; i++){
                
            }
        }
    })
}