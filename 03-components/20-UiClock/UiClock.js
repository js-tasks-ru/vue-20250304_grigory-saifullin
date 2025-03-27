import {defineComponent, ref, onBeforeMount, onUnmounted} from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(new Date().toLocaleTimeString(navigator.language, {timeStyle: 'medium'}));

    let intervalId = null

    onBeforeMount(() => {
      intervalId = setInterval(() => {
        time.value = new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' });
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      time
    }
  },


  template: `<div class="clock">{{ time }}</div>`,
})
