$(document).ready(function (){
    $("#btn").on("click", function(event){

        var apikey = '2e9e3402c84c17a1b6756c015c8e478d'
        var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
        var locationQuery = $("#city").val();
        var bigDiv = document.getElementById('mainDiv')
        var currentDate = moment().format("MMM/ Do /YY");

    event.preventDefault();

        $.ajax({
            url: baseUrl + locationQuery + '&appId=' + apikey,
            method: 'GET'
        }) 


        // this is a button
        .then(function (results){
            console.log(results)
            var humidity = results.main.humidity
            var city = results.name
            var windSpeed = results.wind.speed
            var tempT = (results.main.temp - 273.15) * 1.80 + 32;

            $('#cityName').html('<h1>' + city  +  " " + currentDate + '</h1>')

            $('.temp').text("tempature (f): " + tempT)

            $('#windSpeedDiv').text('wind speed:  ' + windSpeed + ' MPH')
            $('#humidDiv').text('humidity: ' + humidity + '%')


            // this gets the uv index
            var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?appid='
            var lat = results.coord.lat
            var lon = results.coord.lon


            $.ajax({
                url: uvUrl + apikey + '&lat=' + lat + '&lon=' + lon,
                method: 'GET'
                
            }).then(function (test){
                console.log(test)
                var uvIndex = test.value
                console.log(uvIndex)
                $('#uvDiv').text('UV index ' + uvIndex)
            })
        })
    })
})