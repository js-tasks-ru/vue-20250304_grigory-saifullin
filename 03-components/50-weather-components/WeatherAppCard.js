import { defineComponent } from 'vue'
import {WeatherConditionIcons} from "./weather.service.ts";
import WeatherAppCardAlert from "./WeatherAppCardAlert.js";

export default defineComponent({
  name: 'WeatherAppCard',
  components: { WeatherAppCardAlert },

  props: {
    city: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const tempCelsius = tempF => {
      return (tempF - 273.15).toFixed(1)
    }

    const getWeatherIcons = id => {
      return WeatherConditionIcons[id]
    }

    const mmPressure = pressure => {
      return (pressure * 0.75).toFixed(0)
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
      checkNight,
      tempCelsius,
      getWeatherIcons,
      mmPressure,
    }
  },

  template: `
  <li class="weather-card"
      :class="{'weather-card--night': checkNight(city.current.dt, city.current.sunrise, city.current.sunset)}"
      >
    <WeatherAppCardAlert v-if="city.alert" :sender-name="city.alert.sender_name" :description="city.alert.description"/>

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
      <div class="weather-conditions__temp"> {{ tempCelsius(city.current.temp) }} °C</div>
    </div>
    <div class="weather-details">
      <div class="weather-details__item">
        <div class="weather-details__item-label">Давление, мм рт. ст.</div>
        <div class="weather-details__item-value">{{ mmPressure(city.current.pressure) }}</div>
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
  `,
})
