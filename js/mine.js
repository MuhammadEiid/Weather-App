let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


async function search(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7bf1f43283254b7cb31140426220606&q=${city}&days=3`);
    let finalResult = await response.json();
    displayCurrent(finalResult.location, finalResult.current), displayNextDays(finalResult.forecast.forecastday)

}

document.getElementById("search").addEventListener("keyup", city => {
    search(city.target.value);
});



function displayCurrent(city, currentResult) {
    if (currentResult != null) {
        let lastUpdate = new Date(currentResult.last_updated);
        // console.log(lastUpdate);
        let x = `<div class="current col-md-4 box">

        <div class="forecast-header d-flex justify-content-between align-content-center px-3" id="today">
            <div class="day">${days[lastUpdate.getDay()]}</div>
            <div class=" date">${lastUpdate.getDate() + " " + months[lastUpdate.getMonth()]}</div>
        </div>
        <div class="forecast-content px-3 py-4" id="current">
            <div class="location fs-5">${city.name}</div>
            <div class="degree">
                <div class="num">${currentResult.temp_c}<sup>o</sup>C</div>

                <div class="forecast-icon ">
                    <img src="https:${currentResult.condition.icon}" width="90">
                </div>

            </div>
            <div class="custom">${currentResult.condition.text}</div>
            <div class="status d-flex justify-content-evenly align-content-center pt-3">
            <span><img src="images/icon-umberella.png" alt="">20%</span>
            <span><img src="images/icon-wind.png" alt="">${currentResult.wind_kph} Km/h</span>
            <span><img src="images/icon-compass.png" alt="">East</span>
        </div>
        </div>
    </div>`;
        document.getElementById("forecast").innerHTML = x;
    }
}



function displayNextDays(data) {
let x =``;
for (let i = 1; i < data.length; i++) {

    x+= ` <div class="col-md-4 box">
    <div class="forecast-header">
        <div class="day">${days[new Date(data[i].date).getDay()]}</div>
    </div>
    <div class="forecast-content p-5">
        <div class="forecast-icon">
            <img src="https:${data[i].day.condition.icon}" width="60">
        </div>
        <div class="degree fs-3 pb-2">${data[i].day.maxtemp_c}<sup>o</sup>C</div>
        <small class="fs-6">${data[i].day.mintemp_c}<sup>o</sup></small>
        <div class="custom pt-2">${data[i].day.condition.text}</div>
    </div>
</div>`
}
document.getElementById("forecast").innerHTML += x;
}

search("London")
