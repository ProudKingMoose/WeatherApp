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

        GetTemperature(longitude, latitude);
    })
})

function GetTemperature(longitude, latitude){

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