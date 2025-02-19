// @flow

// TODO:
// - ideally find a way to get current location. It must be possible as Scriptable achieves this
//   with await Location.current()
//   and has a Location.reverseGeocode(latitude, longitude) field -> postal town etc.

// import { showMessage } from '../../helperFunctions'
import { getOrMakeConfigurationSection } from '../../nmn.Templates/src/configuration'

// Get summary of today's weather in a line
// Using https://openweathermap.org/api/one-call-api#data, for which you can get a free API key
export async function getWeatherSummary(
  // eslint-disable-next-line no-unused-vars
  weatherParams: string,
  // eslint-disable-next-line no-unused-vars
  config: { [string]: ?mixed }, // FIXME: In time remove this parameter
): Promise<string> {
  const weatherDescText = [
    'showers',
    'rain',
    'sunny intervals',
    'partly sunny',
    'sunny',
    'cloud',
    'snow ',
    'thunderstorm',
    'tornado',
  ]
  const weatherDescIcons = ['🌦️', '🌧️', '🌤', '⛅', '☀️', '☁️', '🌨️', '⛈', '🌪']

  // Get config settings from Template folder _configuration note
  const config2 = await getOrMakeConfigurationSection(
    'weather',
    DEFAULT_WEATHER_CONFIG,
  )
  
  // Get config settings from Template folder _configuration note
  // $FlowIgnore
  const weatherConfig: any = config2.weather ?? null
  if (weatherConfig == null) {
    console.log("Cannot find 'weather' settings in Templates/_configuration note.")
    return "_Error: Cannot find 'weather' settings in Templates/_configuration note._"
  }
  const pref_openWeatherAPIKey = weatherConfig.openWeatherAPIKey
  const pref_latPosition = weatherConfig.latPosition
  const pref_longPosition = weatherConfig.longPosition
  const pref_openWeatherUnits = weatherConfig.openWeatherUnits

  const getWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${pref_latPosition}&lon=${pref_longPosition}&exclude=current,hourly,minutely&units=${pref_openWeatherUnits}&appid=${pref_openWeatherAPIKey}`

  // ** The following is the more correct way, but doesn't work.
  //    So have to use a way that Flow doesn't like.
  //    See Issue 7 **
  // const response = await fetch(getWeatherURL)
  // console.log(response.status)
  // console.log(response.statusText)
  // console.log(response.type)
  // console.log(response.url)
  // let jsonIn
  // if (response.ok) { // if HTTP-status is 200-299
  //   jsonIn = await response.json()
  // } else {
  //   return `Sorry; error ${response.status} in Weather lookup`
  // }

  console.log(getWeatherURL)
  let jsonIn
  let weatherTodayAll
  try {
    jsonIn = await fetch(getWeatherURL)
    // console.log(`  HTTP response ${jsonIn.status}`) //  .status always returns 'undefined', even when it works?!
  } catch(err) {
    console.log(`Error ${err.message} parsing Weather data lookup. Please check your _configuration note.`)
    return `Error ${err.message} parsing Weather data lookup. Please check your _configuration note.`
  }
  if (jsonIn != null) {
    try {
      // $FlowIgnore[incompatible-call]
      weatherTodayAll = JSON.parse(jsonIn)?.daily['0']
    } catch (err) {
      console.log(`Error ${err.message} parsing Weather data lookup. Please check your _configuration note.`)
      return `Error ${err.message} parsing Weather data lookup. Please check your _configuration note.`
    }
    // const weatherTodayAll = jsonIn.daily['0']
    const maxTemp = weatherTodayAll.feels_like.day.toFixed(0)
    const minTemp = weatherTodayAll.feels_like.night.toFixed(0)
    const weatherDesc = weatherTodayAll.weather['0'].description ?? ''

    // see if we can fix an icon for this as well, according to returned description. Main terms are:
    // thunderstorm, drizzle, shower > rain, snow, sleet, clear sky, mist, fog, dust, tornado, overcast > clouds
    // with 'light' modifier for rain and snow
    let weatherIcon = ''
    for (let i = 0; i < weatherDescText.length; i++) {
      if (weatherDesc.match(weatherDescText[i])) {
        weatherIcon = weatherDescIcons[i]
        break
      }
    }

    // TODO: Allow for more customisation of what is pulled out from the API's data structure
    // using weatherParams
    // Future use, if we want to do more customisation with parameters
    // console.log(`getWeatherSummary: Params: '${weatherParams}'`)
    // const paramConfig = weatherParams.trim()
    //   ? await parseJSON5(weatherParams)
    //   : {}
    // console.log(paramConfig)

    const summaryLine = `${weatherIcon}${weatherDesc} ${maxTemp}/${minTemp}`
    console.log(`\t${summaryLine}`)
    return summaryLine
  } else {
    return `Problem in Weather data lookup for ${pref_latPosition}/${pref_longPosition}. Please check your _configuration note.`
  }
}


const DEFAULT_WEATHER_CONFIG = `
  // configuration for weather data (used in Daily Note Template, for example)
  weather: {
    // API key for https://openweathermap.org/
    // !!REQUIRED!!
    openWeatherAPIKey: '... put your API key here ...',
    // Required location for weather forecast
    latPosition: 0.0,
    longPosition: 0.0,
    // Default units. Can be 'metric' (for Celsius), or 'metric' (for Fahrenheit)
    openWeatherUnits: 'metric',
  },
`
