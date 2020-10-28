import { ComponentPropsOptions, defineComponent, ExtractPropTypes, getCurrentInstance, SetupContext, withCtx } from 'vue';

export function designComponent<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  Props extends Readonly<ExtractPropTypes<PropsOptions>>,
  Refer,
  >(
    options: {
      name?: string,
      props?: PropsOptions,

      setup: (props: Props, setupContext: SetupContext) => {
        refer?: Refer,
        render: () => any,
      }
    }) {

  const { setup, ...leftOptions } = options;

  return {
    ...defineComponent({
      ...leftOptions,
      setup(props: Props, setupContext: SetupContext) {

        const ctx = getCurrentInstance() as any;
        
        if (!setup) {
          console.error('designComponent: setup is required!');
          return () => null;
        }
        const { refer, render } = setup(props, setupContext);

        ctx._refer = refer;
  
        return render;
      }
    } as any),
    use: {
      ref: (refName: string) => {
        const ctx = (getCurrentInstance() as any).ctx;
        return {
          get value() {
            return ((ctx as any).$refs[refName].$._refer) as Refer | null;
          }
        }
      }
    }
  };
}
