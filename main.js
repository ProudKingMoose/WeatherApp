const apikey = "qiFh1fKB1pU1kUbw6FtUOg==vq5q2Inug1ReNehS"
const button = document.getElementById("Get-Weather")

const array = [];
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

button.addEventListener("click", ()=>{
    const city = document.getElementById("City").value;
    const country = document.getElementById("Country").value;
    document.getElementById("dailyWeaCity").innerText = city
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

        const mDiv = document.getElementsByClassName("dailyWeatherDiv")[0];
        array.splice(0,14);

        for(var i = 0; i < 14; i++){

            let CoinDiv = document.createElement("div");
            CoinDiv.classList.add("dailyWeatherStats");
            mDiv.appendChild(CoinDiv);

            array.push(CoinDiv);
            
            for(var j = 0; j < 5; j++)
            {
                
                let IBox = document.createElement("div")
                IBox.classList.add("infobox");
                let varDiv = document.createElement("div");
                varDiv.classList.add("infoVar");
                if (j==1)
                {
                    let pactDiv = document.createElement("div");
                    pactDiv.classList.add("infoPact");
    
                    IBox.appendChild(pactDiv);
                    getWcode(result.current.weathercode, pactDiv, varDiv);
                    
                }
                IBox.appendChild(varDiv);
                CoinDiv.appendChild(IBox);
                if (j==0)
                {
                    let date = document.createElement("h3")
                    date.innerText = result.daily.time[i];
                    date.classList.add("date");
                    varDiv.appendChild(date);
                }

                if (j==2)
                {
                    let temp = document.createElement("h3")
                    temp.classList.add("temp");

                    var temperature = result.daily.apparent_temperature_max[i];
                    temp.innerText = temperature + "C°";

                    varDiv.appendChild(temp);
                }
                if (j==3)
                {
                    let Wind = document.createElement("h3")
                    Wind.classList.add("wind");

                    var windspeed = result.daily.windspeed_10m_max[i];
                    var winddirection = degToCompass(result.daily.windspeed_10m_max[i]);
                    Wind.innerText = windspeed + "m/s" + " " + winddirection;

                    varDiv.appendChild(Wind);
                }
                if (j==4)
                {
                    let Pre = document.createElement("h3")
                    Pre.classList.add("pre");

                    var precipitation = result.daily.precipitation_sum[i];
                    Pre.innerText = precipitation + " mm";

                    varDiv.appendChild(Pre);
                }
            }
        }
    })

    function getWcode(wCode, pactDiv, varDiv){
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
            let descrip = document.createElement("h3");
            descrip.innerText = dsc;
            let image = document.createElement("img");
            image.src = img;
            varDiv.appendChild(descrip);
            pactDiv.appendChild(image);
        })
        }

    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
}