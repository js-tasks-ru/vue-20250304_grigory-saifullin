import {computed, defineComponent} from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    }
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    const disabledBtnMin = computed(() => props.count === props.min);

    const disabledBtnMax = computed(() => props.count === props.max);

    const decrement = () => {
      emit('update:count', props.count - 1);
    };

    const increment = () => {
      emit('update:count', props.count + 1);
    };

    return {
      disabledBtnMin,
      disabledBtnMax,
      decrement,
      increment,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="disabledBtnMin" @click="decrement">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="disabledBtnMax" @click="increment">➕</UiButton>
    </div>
  `,
})
