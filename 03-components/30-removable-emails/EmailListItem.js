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

  setup(props, {emit}) {
    const removeEmail = () => {
      emit('update-emails')
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
