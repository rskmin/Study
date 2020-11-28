import React from 'react'
export default function Post(props) {
  console.log(props);
  return (<div>
    id: {props.match.params.id}<br />
    title: {props.location.state.title}
    </div>);
}