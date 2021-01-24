import React, { Component, ComponentType } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const defaultProps = {
  settings: {
    maxLength: 6,
    placeholder: '请输入待办事项',
  },
}

export type IDefaultProps = Partial<typeof defaultProps>;

export const withDefaultProps = <IProps extends IDefaultProps>(OldComponent: ComponentType<IProps>) => {
  type IOwnProps = Omit<IProps, keyof IDefaultProps>;
  class NewComponent extends Component<IOwnProps> {
    render() {
      const props = { ...defaultProps, ...this.props } as IProps;
      return (
        <OldComponent {...props} />
      )
    }
  }
  return hoistNonReactStatic(NewComponent, OldComponent);
}