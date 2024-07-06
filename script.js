var locations = [];
var apiKey = "b4b1fb78450e49b4a13154250240507"

//using async/await
async function getWeatherInfo(location) {
    try {
        var response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`, {mode: 'cors'});
        const data = await response.json();
        return [data.current.temp_f, data.current.condition.text];
        
    } catch (error) {
        console.error(error);
        return null;
    }
}
//using .then()
async function getGIF(condition) {
    const img = document.createElement("img");
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=luBwMCctAYFh6meQQuXRx0UWoIHXuSkp&s=' + condition, {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        img.src = response.data.images.original.url;
        document.getElementById("title").appendChild(img);
      })
    
}

document.getElementById("submit").addEventListener("click", async () => {
    const location = document.getElementById("location").value;
    const weatherInfo = await getWeatherInfo(location);
    const temp = weatherInfo[0];
    const condition = weatherInfo[1];
    if (locations.find((city) => city === location) === undefined) {
        locations.push(location);
    } else {
        alert("This city has already been searched for. Don't waste my API calls!");
        return;
    }

    var newCity = document.createElement("p");
    if (temp === null) {
        newCity.textContent = `The Weather in ${location} is not available`;
    } else {
        newCity.textContent = `The Weather in ${location} is ${temp}°F and ${condition}`;
        getGIF(condition);
    }
    document.getElementById("container").appendChild(newCity);
});