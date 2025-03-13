import {computed, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const operator = ref('');

    const modifyOperator = (event) => {
      operator.value = event.target.value;
    }

    const resultOperation = computed(() => {

      if (firstOperand.value && secondOperand.value) {
        switch (operator.value) {

          case 'sum':
            return firstOperand.value + secondOperand.value;

          case 'subtract': {
            return firstOperand.value - secondOperand.value;
          }

          case 'multiply': {
            return firstOperand.value * secondOperand.value;
          }

          case 'divide': {
            const result = firstOperand.value / secondOperand.value;
            return result % 1 === 0 ? result : result.toFixed(1);
          }
        }
      } else {
        return '';
      }

    })

    return {
      firstOperand,
      secondOperand,
      operator,
      modifyOperator,
      resultOperation
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" @input="modifyOperator($event)"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" @input="modifyOperator($event)"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" @input="modifyOperator($event)"/>✖</label>
        <label><input type="radio" name="operator" value="divide" @input="modifyOperator($event)"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand"/>

      <div>=</div>

      <output>{{ resultOperation }}</output>
    </div>
  `,
})
