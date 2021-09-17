const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

function title(str){
    var strArr = str.split(" ")
    return strArr.reduce(function(res, str){
        return res += str[0].toUpperCase() + str.slice(1) + " "
    }, "")
}

class IndexController{
    async index(req, res){
        var data = {}
        if (req.method === "POST"){
            var city_name = req.body["search-city"]
            if (city_name === ""){
                res.render("index", data)
            }
            console.log(city_name)
            try {
                var json_data = await $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${city_name.toLowerCase()}&appid=5bbc1acec51d4e6e1a1a397973e0a2a0`)
                data = {
                    "city_name" : title(city_name),
                    "country_code" : String(json_data["sys"]["country"]),
                    "coordinates" : String(json_data["coord"]["lon"]) + " " + String(json_data["coord"]["lat"]),
                    "temp" : String(Math.round(json_data["main"]["temp"] - 273.15, 2)) + "'C",
                    "pressure" : String(json_data["main"]["pressure"]),
                    "humidity" : String(json_data["main"]["humidity"])
                }
            } catch (error) {
                data = {
                    "city_name" : "City Not Found"
                }
            }
        }
        return res.render("index", data)
    }
}

module.exports = new IndexController