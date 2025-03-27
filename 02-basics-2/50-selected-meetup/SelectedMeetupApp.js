import {computed, defineComponent, ref, watchEffect} from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {

    const selectedMeetup = ref('1');
    const meetupTitle = ref();
    const loading = ref(false);

    const disabledBtnPrev = computed( () => selectedMeetup.value <= 1 || loading.value)

    const disabledBtnNext = computed(() => selectedMeetup.value >= 5 || loading.value)

    watchEffect(async () => {
      loading.value = true;

      try {
        const data = await getMeetup(selectedMeetup.value);
        meetupTitle.value = data.title;
      } catch (e) {
        meetupTitle.value = 'Произошла ошибка';
      } finally {
        loading.value = false;
      }

    })

    const slideMeetup = (flag) => {
      if (flag === 'Increment') {
        let number = Number(selectedMeetup.value);
        number++;
        selectedMeetup.value = number.toString();
      } else if (flag === 'Decrement') {
        let number = Number(selectedMeetup.value);
        number--;
        selectedMeetup.value = number.toString();
      }

    }

    return {
      selectedMeetup,
      meetupTitle,
      disabledBtnPrev,
      disabledBtnNext,
      slideMeetup
    }

  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="disabledBtnPrev"
          @click="slideMeetup('Decrement')"
        >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="1"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="2"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="3"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="4"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              value="5"
              v-model="selectedMeetup"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="disabledBtnNext"
          @click="slideMeetup('Increment')"
        >Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupTitle }}</h1>
        </div>
      </div>

    </div>
  `,
})
