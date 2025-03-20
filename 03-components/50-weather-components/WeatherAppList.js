import { defineComponent } from 'vue'
import WeatherAppCard from "./WeatherAppCard.js";

export default defineComponent({
  name: 'WeatherAppList',
  components: { WeatherAppCard },

  props: {
    cities: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="weather-list unstyled-list">
        <WeatherAppCard v-for="(city) in cities"  :city="city"/>
    </ul>
  `,
})
