import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['deleteEmail'],

  setup(props, {emit}) {
    const removeEmail = () => {
      emit('deleteEmail')
    }

    return {
      removeEmail,
    }
  },

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить" @click.stop="removeEmail">❌</button>
    </li>
  `,
})
