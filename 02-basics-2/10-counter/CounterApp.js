import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0);

    const modifyCounter = (event) => {
      switch (event.target.getAttribute('aria-label')) {

        case 'Decrement':
          counter.value--;
          break;

        case 'Increment':
          counter.value++;
          break;
      }
    }

    return {
      counter,
      modifyCounter
    }
  },

  template: `
    <div class="counter">

      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter <= 0"
        @click="modifyCounter($event)"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter >= 5"
        @click="modifyCounter($event)"
      >➕</button>

    </div>
  `,
})
