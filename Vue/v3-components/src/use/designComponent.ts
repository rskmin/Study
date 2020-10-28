import { ComponentPropsOptions, defineComponent, ExtractPropTypes, getCurrentInstance, inject, provide, SetupContext, withCtx } from 'vue';

/**
 * 扩展了defineComponent
 * 1. 使用扩展方法 - component.use
 * @param options
 */
export function designComponent<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  Props extends Readonly<ExtractPropTypes<PropsOptions>>,
  Refer,
  >(
    options: {
      name?: string,
      props?: PropsOptions,

      provideRefer?: boolean,
      setup: (props: Props, setupContext: SetupContext) => {
        refer?: Refer,
        render: () => any,
      }
    }) {

  const { setup, provideRefer, ...leftOptions } = options;

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

        provideRefer && (
          !leftOptions.name ?
            console.error('designComponent: name is required when provideRefer is true!') :
            provide(`@@${leftOptions.name}`, refer)
        );

        ctx._refer = refer;

        return render;
      }
    } as any),
    /**
     * 组件的扩展功能
     */
    use: {
      /**
       * 获取组件实例的 refer
       * 自动获取正确的类型提示以及约束，无需额外编写组件类型声明
       */
      ref: (refName: string) => {
        const ctx = (getCurrentInstance() as any).ctx;
        return {
          get value() {
            return ((ctx as any).$refs[refName].$._refer) as Refer | null;
          }
        }
      },
      /**
       * 只能用于单例组件
       * 注入组件实例内部的 refer
       * 注册组件时要传入 provideRefer: true
       * 自动获取正确的类型提示以及约束，无需额外编写组件类型声明
       */
      inject: (defaultValue?: any) => {
        return inject(`@@${leftOptions.name}`, defaultValue) as Refer;
      }
    }
  };
}
