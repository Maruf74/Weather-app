let placeName = document.getElementById("placeName")
let weatherDate = document.getElementById("weatherDate");
let icon = document.getElementById("icon");
let temp = document.getElementById("temp");
let description = document.getElementById("description");
let updateTime = document.getElementById("updateTime");
let ampm = document.getElementById("ampm");
let weatherToday = document.getElementById("weatherToday");
let weakly_weather = document.getElementById("weakly_weather");
let search = document.getElementById("search");
let inp = document.getElementById("inp");
let bg = document.getElementById("bg");
let content = document.getElementById("content");








let am;
let ip;
let city;




search.addEventListener('click', function (e) {
  e.preventDefault();
  city = inp.value;
  getWeather()

})



function autoLocate() {
  // get ip
  axios
    .get("https://api64.ipify.org?format=json")
    .then(function (res) {

      // console.log(res);

      ip = res.data.ip;
      ds()

    })
    .catch(function (err) {
      console.log(err);
    })


}


// city

function ds() {


  axios
    .get(`https://api.ipinfodb.com/v3/ip-city/?key=20b96dca8b9a5d37b0355e9461c66e76eed30a2274422fa6213d9de6ffb2b34e&ip=${ip}&format=json`)
    .then(function (res) {
      // console.log(res);
      city = res.data.regionName
      getWeather()
    })

    .catch(function (err) {
      console.log(err);
    })

  // setTimeout(() => {
  //   getWeather()
  // }, 1000);



}











// 

// 


// 

// 

// 
//





function bgChange(dis) {
  console.log(dis);
  if (dis == "Clouds") {
    bg.style.backgroundImage = "url('./img/clouds.jpg')"
  }
  else if (dis == "Clear") {
    bg.style.backgroundImage = "url('./img/clear_sky.jpg')"
  }
  else if (dis == "Rain") {
    bg.style.backgroundImage = "url('./img/rain.jpg')"
  }
  else if (dis == "Thunderstorm") {
    bg.style.backgroundImage = "url('./img/thunderstorm.jpg')"
  }
  else if (dis == "Haze") {
    bg.style.backgroundImage = "url('./img/mist.jpg')"
  } else {
    bg.style.backgroundImage = "url('./img/pexels-photo-1118873.webp')"
  }

}









//weather
function getWeather() {
  // console.log(city);

  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed00f08bafceed4aabb76e0fc613db94`)
    .then(function (res) {
      content.style.visibility = "visible";
      let weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      let date_str = new Date(res.data.dt * 1000);
      let dat = date_str.getDate()
      let day = date_str.getDay()
      let hur = date_str.getHours()
      let min = date_str.getMinutes()
      let timeampm;
      let dis = res.data.weather[0].main;
      if (hur > 12) {
        timeampm = 'PM'
        hur = hur - 12
      } else {
        timeampm = 'AM'
      }
      //main
      placeName.innerHTML = `<span> ${res.data.name}</span> <samp>,</samp> <span>${res.data.sys.country}</span>`;

      weatherDate.innerHTML = `${weekday[day]} ${dat}   `
      icon.src = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
      temp.innerText = `${Math.round((res.data.main.temp) - 273.15)}°C`
      description.innerHTML = dis
      updateTime.innerText = `Updated as of ${hur} : 00 ${timeampm} `
      weather7Days(res);
      bgChange(dis)

    })
    .catch(function (err) {
      console.log(err);
    })

}



function weather7Days(loc) {
  axios
    .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${loc.data.coord.lat}&lon=${loc.data.coord.lon}&exclude=hourly&appid=70777e493708206be456f27c94a138ba`)
    .then(function (res) {
      // console.log(res);

      let weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];




      weakly_weather.innerHTML = ""
      for (let i = 1; i <= 6; i = i + 1) {




        let date_str = new Date(res.data.daily[i].dt * 1000);

        let date = date_str.getDate()
        let day = date_str.getDay()
        let month = date_str.getMonth()
        console.log(month);





        weakly_weather.innerHTML += ` <div class="weakly-weather-item">
        <p class="mb-0"> ${weekday[day]}, ${date}  ${months[month]} </p>
        <img src=http://openweathermap.org/img/wn/${res.data.daily[i].weather[0].icon}@2x.png alt="">
        <p class="mb-0">max : ${Math.round((res.data.daily[i].feels_like.day) - 273)}°C </p>
        <p class="mb-0">min : ${Math.round((res.data.daily[i].feels_like.night) - 273)}°C </p>
        </div>
        `


      }



    })
    .catch(function (err) {
      console.log(err);
    })

}





//weather
// function getWeatherBySearch() {
//   axios
//     .get(`http://api.openweathermap.org/data/2.5/forecast/?q=${inp.value}&&cnt=10&appid=ed00f08bafceed4aabb76e0fc613db94`)
//     .then(function (res) {
//       console.log(res);

//     })
//     .catch(function (err) {
//       console.log(err);
//     })

// }




















// let times = res.data.list[0].dt_txt


// let date = times.slice(8, -9)
// // console.log(date);
// weatherToday.innerHTML = "";
// let i = 1;
// for (date; date == res.data.list[i].dt_txt.slice(8, -9); date = date) {


//   let tm = res.data.list[i].dt_txt.slice(10, -6)
//   if (tm >= 12) {

//     tm = tm - 12
//     am = "PM"

//   } else {

//     am = "AM"
//   }



//   weatherToday.innerHTML +=
//     `<div class="col-md-2 m-1 " style="background-color: rgba(113, 243, 243, 0.219); border-radius: 10px; padding: 5px;">
//   <h6>${tm} : 00 ${am} </h6>
//   <img src="http://openweathermap.org/img/wn/${res.data.list[i].weather[0].icon}@2x.png" alt="">
//   <span class=" d-block">${res.data.list[i].weather[0].main}</span>
//   <h6>Feels Like: <strong>${Math.round((res.data.list[i].main.feels_like) - 273.15)}</strong> °C</h6>
//   </div>`

//   // console.log(i);

//   i++;
// }









// if (time >= 12) {
//   ampm.innerText = " PM"
//   time = time - 12
//   am = "PM"

// } else {
//   ampm.innerText = " AM"
//   am = "AM"
// }



