import { designComponent } from '../../use/designComponent';
import { ref, computed, watch } from 'vue';
import './input.scss';

console.log('加载了 Input 组件');

export default designComponent({
  name: 'pl-input',
  props: {
    status: { type: String, default: 'primary' },
    modelValue: { type: [String, Number] },
  },
  emits: {
    updateModelValue: (val: string | number | undefined) => true,
  },
  setup({ props, event }) {
    const model = ref(props.modelValue);
    const inputRef = ref(null as null | HTMLInputElement);

    const classes = computed(() => [
      'pl-input',
      `pl-input-status-${props.status}`
    ]);

    const handler = {
      onInput: (e: Event) => {
        model.value = (e.target as HTMLInputElement).value;
        event.emit.updateModelValue(model.value);
      }
    };

    const methods = {
      clear: () => {
        model.value = '';
      },
      focus: (flag: boolean) => {
        inputRef.value?.focus();
        flag && (model.value = '');
      },
    };

    watch(() => props.modelValue, val => model.value = val);

    return {
      refer: {
        methods,
        model,
      },
      render: () => (
        <div class={classes.value}>
          <input
            class="pl-input-inner"
            type="text"
            value={model.value}
            onInput={handler.onInput}
            ref={inputRef}
          />
          <button onClick={methods.clear}>clear</button>
          <button onClick={() => methods.focus(true)}>focus</button>
        </div>
      ),
    }
  }
})
