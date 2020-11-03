import { ComponentPropsOptions, defineComponent, ExtractPropTypes, getCurrentInstance, inject, provide, SetupContext } from 'vue';
import { ComponentEvent, getComponentEmit, useEvent } from './useEvent';

/**
 * 扩展了defineComponent
 * 1. 使用扩展方法 - component.use
 * @param options
 */
export function designComponent<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  Props extends Readonly<ExtractPropTypes<PropsOptions>>,
  Emits extends { [k: string]: (...args: any[]) => boolean },
  Refer,
  >(
    options: {
      name?: string,
      props?: PropsOptions,

      provideRefer?: boolean,
      emits?: Emits,
      setup: (parameter: { props: Props, event: ComponentEvent<Emits>, setupContext: SetupContext<Emits> }) => {
        refer?: Refer,
        render: () => any,
      }
    }) {

  const { setup, provideRefer, emits, ...leftOptions } = options;

  return {
    ...defineComponent({
      ...leftOptions,
      emits: getComponentEmit(emits),
      setup(props: Props, setupContext: any) {

        const ctx = getCurrentInstance() as any;
        const event = useEvent<Emits>(emits!);

        if (!setup) {
          console.error('designComponent: setup is required!');
          return () => null;
        }
        const { refer, render } = setup({props, event, setupContext});

        provideRefer && (
          !leftOptions.name ?
            console.error('designComponent: name is required when provideRefer is true!') :
            provide(`@@${leftOptions.name}`, refer)
        );

        if (!!refer) {
          const duplicateKey = Object.keys(leftOptions.props || {})
            .find(i => Object.prototype.hasOwnProperty.call(refer as any, i));
          if (!!duplicateKey) {
            console.error(`designComponent: duplicate key ${duplicateKey} in refer`);
          } else {
            Object.assign(ctx.proxy, refer);
          }
        }

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
        const ctx = getCurrentInstance()!;
        return {
          get value() {
            return ctx.refs[refName] as Refer | null;
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
