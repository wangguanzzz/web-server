const request = require('request')


const forecast =(lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f059d3fc018ed856bf3fbad20d0dde41&query='+encodeURIComponent(long)+','+encodeURIComponent(lat)+'&units=f'
    
    request({url,json:true},(err, {body: result}={})=>{
        if(err){
            callback('cannot connect to weatherstack',undefined)
        }else if(result.error){
            callback('wrong query to weatherstack',undefined)
        }else{
            callback(undefined,{
                weather: result.current.weather_descriptions[0],
                temperature: result.current.temperature,
                feelslike: result.current.feelslike
            })
        }

    })
}


module.exports = forecast