import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherAppList from "./WeatherAppList.js";

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherAppList
  },

  setup() {
    const data = getWeatherData()

    return {
      data
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <WeatherAppList :cities="data"/>
    </div>
  `,
})
