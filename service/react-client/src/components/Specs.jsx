import React from '../../../node_modules/react/umd/react.production.min.js';

const Specs = (props) => {
  return (
    <div>
      <ul>{props.specification.map((specs, i) => {
        return <li key={i}>{specs}</li>
        })}
      </ul>
    </div>
  )
}

export default Specs;

