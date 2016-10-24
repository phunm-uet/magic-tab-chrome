$(document).ready(function() {
    setInterval(getTime,1000);
    var wallpaper = getWallpaper();
   $('body').css('background-image', "url('"+"backgrounds/"+wallpaper+".jpg ')");
  var loca = getCity();
   var weather = getWeather(loca);
   console.log(weather);
   $('.img-weather').attr('src', weather.image);
   $('.temperature').html(weather.temp + "&deg"+"C");
   $("#loading_wrap").slideUp();
   $(".card").slideDown();
   countDay();
});



function getTime(){ 
    var curTime =  new Date().toLocaleTimeString('en-US', {
                                            hour12: false, 
                                             hour: "numeric", 
                                             minute: "numeric",
                                            });
  $(".curTime").html(curTime);
}
$.ajaxSetup({
    async: false
});

function getCity(){
  var loca;
    $.getJSON('http://ip-api.com/json',function(data) {
        var city = data.city;
        var countryCode = data.countryCode;
        loca = city+","+countryCode;
        $(".location").html(loca);
    });
    return loca;
  }
function getWallpaper(){
  var wallpaper = Math.floor((Math.random() * 24) + 1);
  return wallpaper;

}
var weather = {};

  function getWeather(loca){
    var query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+loca+'")';
    var uri = "https://query.yahooapis.com/v1/public/yql?q=";
    var urlRequest = uri+ encodeURI(query)+"&format=json";
    $.getJSON(urlRequest,function(data){
      var code = data.query.results.channel.item.condition.code;
      weather.code = code; 
      weather.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+code+"d.png";
      weather.temp = convertTemp(data.query.results.channel.item.condition.temp);
      weather.text = data.query.results.channel.item.condition.text;
    })
    return weather;
  }

  function convertTemp(temp){
    return Math.round((5.0/9.0)*(temp-32.0));
  }

  function countDay(){
    var past = new Date(2015,3,6);
    var now = new Date;
    console.log(past);
    var day = Math.floor((now - past)/(1000*60*60*24));
    $('.love-day').html(day+"</br>Days");
  }