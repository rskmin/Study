import { NAMESPACE_SEP } from './constants';

function prefixNamespace(model) {
  if (model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace);
  }
  return model;
}

function prefix(obj, namespace) {
  return Object.keys(obj).reduce((memo, key) => {
    // add => counter/add
    memo[`${namespace}${NAMESPACE_SEP}${key}`] = obj[key];
    return memo;
  }, {});
}

export default prefixNamespace;