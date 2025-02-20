const getGeocode = async (location: string) => {
    const geocode = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.WEATHER_API_KEY}`)
    const geocodeData = await geocode.json() as { lat: number, lon: number }[]
    
    return geocodeData
}

export const WeatherService = {
    async getWeatherForLocation(location: string) {
        const geocodeData = await getGeocode(location)
        const lat = geocodeData[0]?.lat
        const lon = geocodeData[0]?.lon

        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY_2}`)
        const weatherData = await weather.json() as { main: { temp: number }, weather: { description: string }[] }
        
        return weatherData
    }
}

