const apiKey = "YOUR_API_KEY";

function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city");
        return;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "⏳ Loading...";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 200) {
                const temp = data.main.temp;
                const feels = data.main.feels_like;
                const weather = data.weather[0].description;
                const humidity = data.main.humidity;
                const condition = data.weather[0].main.toLowerCase();

                // Dynamic background
                if (condition.includes("cloud")) {
                    document.body.style.background = "#757F9A";
                } else if (condition.includes("clear")) {
                    document.body.style.background = "#fceabb";
                } else if (condition.includes("rain")) {
                    document.body.style.background = "#4e54c8";
                } else {
                    document.body.style.background = "#43cea2";
                }

                resultDiv.innerHTML = `
                    <h3>${city}</h3>
                    <p>🌡️ Temperature: ${temp}°C</p>
                    <p>🤒 Feels Like: ${feels}°C</p>
                    <p>🌤️ Condition: ${weather}</p>
                    <p>💧 Humidity: ${humidity}%</p>
                `;
            } else {
                resultDiv.innerHTML = "❌ City not found";
            }
        })
        .catch(() => {
            resultDiv.innerHTML = "⚠️ Error fetching data";
        });
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});
