import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const data = getWeatherData()

    const tempCelsius = index => {
      return (data[index].current.temp - 273.15).toFixed(1)
    }

    const getWeatherIcons = id => {
      return WeatherConditionIcons[id]
    }

    const mmPressure = index => {
      return (data[index].current.pressure * 0.75).toFixed(0)
    }

    const checkNight = (dt, sunrise, sunset) => {
      function timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number)
        return hours * 60 + minutes
      }

      const dtMinutes = timeToMinutes(dt)
      const sunriseMinutes = timeToMinutes(sunrise)
      const sunsetMinutes = timeToMinutes(sunset)

      return !(dtMinutes >= sunriseMinutes && dtMinutes <= sunsetMinutes)
    }

    return {
      data,
      tempCelsius,
      getWeatherIcons,
      checkNight,
      mmPressure,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="(city, i) in data"
            class="weather-card"
            :class="checkNight(city.current.dt, city.current.sunrise, city.current.sunset) ? 'weather-card--night' : '' ">
          <div v-if="city.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ city.alert.sender_name }}: {{ city.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ city.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ city.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="city.current.weather.description">{{ getWeatherIcons(city.current.weather.id) }}</div>
            <div class="weather-conditions__temp"> {{ tempCelsius(i) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ mmPressure(i) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ city.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ city.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ city.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
