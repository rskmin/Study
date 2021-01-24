import React, { Component } from 'react';
import { ITodo } from '@/models';
import { withDefaultProps, IDefaultProps } from '@/utils';

interface IOwnProps {
  addTodo: (todo: ITodo) => void
}

type IProps = IOwnProps & IDefaultProps;

interface IState {
  text: string;
}

let id = 0;

class TodoInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      text: '',
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      text: event.target.value,
    })
  }
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = this.state.text.trim();
    if (!text) return;
    this.props.addTodo({ id: id++, text });
    this.setState({ text: '' });
  }
  render() {
    const { text } = this.state;
    const { settings } = this.props as IProps & Required<IDefaultProps>;
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              maxLength={settings.maxLength}
              placeholder={settings.placeholder}
              value={text}
              onChange={handleChange}
            />
            <input type="submit" value="添加" />
          </div>
        </form>
      </>
    )
  }
}

export default withDefaultProps(TodoInput);