import { tool as createTool } from 'ai';
import { z } from 'zod';
import { WeatherService } from '~/services/weather.service';

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
   const weather = await WeatherService.getWeatherForLocation(location)
   console.log('weather', weather)

   await new Promise(resolve => setTimeout(resolve, 2000));
    return { weather: weather.weather[0]?.description, temperature: weather.main.temp, location };
  },
});

export const stockTool = createTool({
  description: 'Get price for a stock',
  parameters: z.object({
    symbol: z.string().describe('The stock symbol to get the price for'),
  }),
  execute: async function ({ symbol }) {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { symbol, price: 100 };
  },
});

// Update the tools object
export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool,
};