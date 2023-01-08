
ref={
    input:document.querySelector('.input'),
    widget:document.querySelector('.widget'),
    icon:document.querySelector('.weahher_icon_js'),
    temperature:document.querySelector('.js-temperature'),
    weatherCondition:document.querySelector('.js-weatherCondition'),
    place:document.querySelector('.js-place'),
   date:document.querySelector('js-date'),
}
const KEY= 'f03af649521e47f3b88142345230401'
const BASEAPI= 'http://api.weatherapi.com/v1'

ref.input.addEventListener("change", findWeatherOnInput);



function  findWeatherOnInput(){
    let cityName=ref.input.value
    if (!cityName){
        return 
    }
    console.log(cityName)
    getWeatherInfo(cityName).then(data=>{
        updateWeather(data)
        ref.input.value=""
    }
    ).catch(err=> {console.log(err)})
}

function getWeatherInfo(city){
  
    return fetch(`${BASEAPI}/current.json?key=${KEY}&q=${city}`)
    .then(resp=>{
        if (!resp.ok){
            throw new Error( alert('somthing went wrong try again'))
        }
        return resp.json()
       
        
    })
}



function updateWeather({current,location})
    {
    const {temp_c,condition,last_updated}=current
    const {name,region}=location

    const markup=`<div class="weatherIcon">
    <img src="${condition.icon}" class="weahher_icon_js" width="100" height=100">
</div>
<div class="weatherInfo">
  <div class="temperature"><span class="js-temperature" >${temp_c}&deg;</span></div>
  <div class="description">    
    <div class="weatherCondition"><span class="js-weatherCondition">${condition.text}</span></div>    
     <div class="place"> <span class="js-place">${name}</span></div>
     <div class="place"> <span class="js-place">${region}</span></div>
  </div>
</div>
<div class="date">
<span > Last update</span>
    <span class="js-date">${last_updated}</span></div>
    
    </div>`
    ref.widget.innerHTML= markup
}

// function updateWeather(weatherData){
//     const markup=`<div class="weatherIcon">
//     <img src="${weatherData.current.condition.icon}" class="weahher_icon_js" width="100" height=100">
// </div>
// <div class="weatherInfo">
//   <div class="temperature"><span class="js-temperature" >${weatherData.current.temp_c}&deg;</span></div>
//   <div class="description">    
//     <div class="weatherCondition"><span class="js-weatherCondition">${weatherData.current.condition.text}</span></div>    
//     <div class="place"> <span class="js-place">${weatherData.location.name}</span></div>
//     <div class="place"> <span class="js-place">${weatherData.location.region}</span></div>
//   </div>
// </div>
// <div class="date">
//     <span class="js-date">${weatherData.current.last_updated}</span></div>`
//     ref.widget.innerHTML= markup
// }