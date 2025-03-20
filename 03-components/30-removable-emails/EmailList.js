import { defineComponent } from 'vue'
import EmailListItem from './EmailListItem.js'

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
  },

  emits: ['update-emails'],

  setup(props, { emit }) {

    const sendEmailIndex = (index) => {
      emit('update-emails', index)
    }

    return {
      sendEmailIndex
    }
  },

  template: `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <EmailListItem
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email="email"
        :marked="isMarked"
        @update-emails="sendEmailIndex(index)"
      />
    </ul>
  `,
})
