import React, { Component } from 'react'
import RouterContext from './RouterContext';
/**
 * 获取 location 并通过上下文向下层级 Route 等组件传递，Route 里面可以通过 Context 
 * 获取到 location, location.pathname 获取路径名， 然后跟自己的 path 进行匹配
 * 如果匹配就渲染
 * 
 * 监听路径变化
 */
class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };
    // 当路径发生变化时执行回调
    this.unlisten = props.history.listen((location) => {
      this.setState({location});
    });
  }
  componentWillUnmount() {
    this.unlisten && this.unlisten();
  }
  render() {
    let value = {
      location: this.state.location,
      history: this.props.history,
    };
    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}

export default Router;
