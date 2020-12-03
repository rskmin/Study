import ReactReduxContext from './ReactReduxContext';
import Subscription from './utils/Subscription';

export default function Provider(props) {
  const { store } = props;
  let subscription = new Subscription(store);
  let value = { store, subscription };
  return (
    <ReactReduxContext.Provider value={value}>
      {props.children}
    </ReactReduxContext.Provider>
  )
}
