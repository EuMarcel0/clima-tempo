const gE = (elem)=>{
    return document.getElementById(elem)
};

gE('searchArea').addEventListener('submit', async(e)=>{
    e.preventDefault(e);

    let valueInput = gE('getNameCity').value;
    if(valueInput !== ''){
        let reqTemp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(valueInput)}&appid=e9631253182add3760871d9df5cf3cec&units=metric&lang=pt_br`)
        let reqTempToJson =  await reqTemp.json();
        if(reqTempToJson.cod === 200){
            let climaIcon = reqTempToJson.weather[0].icon;
            let clouds = reqTempToJson.weather[0].description;
            gE('cityName').innerHTML = `${'Tempo agora em '+reqTempToJson.name+', '+reqTempToJson.sys.country}`;
            gE('climaImageDefault').setAttribute('src', `http://openweathermap.org/img/wn/${climaIcon}@2x.png`);
            gE('temp').innerHTML = `${reqTempToJson.main.temp+'<span> °C</span>'}`;
            gE('minTemp').innerHTML = `${'<span class="minMaxTemp">min </span>'+reqTempToJson.main.temp_min+'<span> °C</span>'}`;
            gE('maxTemp').innerHTML = `${'<span class="minMaxTemp">max </span>'+reqTempToJson.main.temp_max+'<span> °C</span>'}`;
            gE('kmStatus').innerHTML = `${reqTempToJson.wind.speed+' km/h'}`;
            gE('humidity').innerHTML = `${reqTempToJson.main.humidity+'%'}`;
            gE('feels').innerHTML = `${reqTempToJson.main.feels_like+'<span> °C</span>'}`;
            gE('clouds').innerHTML = `${clouds}`;


            gE('results').style.display = 'flex';
            gE('messageError').style.display = 'none';
    
        }else{
            gE('messageError').style.display = 'flex';
            gE('results').style.display = 'none';
        }

    }else if(valueInput == ''){
        alert ('Por favor, informe o nome da cidade');
    }
})

gE('newConsult').addEventListener('click', ()=>{
    location.reload();
})
