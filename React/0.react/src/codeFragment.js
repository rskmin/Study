export function createRef() {
  return {
    current: null
  }
}

export function forwardRef(funcComponent) {
  return function (props) {
    return funcComponent(props, props.ref)
  }
}