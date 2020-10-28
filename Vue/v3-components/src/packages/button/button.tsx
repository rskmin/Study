import { designComponent } from 'src/use/designComponent';

export default designComponent({
  name: 'pl-button',
  props: {
    status: { type: String, default: 'primary' },
    label: { type: String },
  },
  setup() {
    return {
      render: () => {
        return (
          <button></button>
        )
      },
    }
  }
});