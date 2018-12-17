import React from '../../../node_modules/react/umd/react.production.min.js';

const Shipping = (props) => {
  return (
    <div>
      <p>All orders will be shipped by Massdrop.</p>
      <p>Estimated ship date is <strong>{props.specification}</strong></p>
      <p>After the drop ends, payment will be collected and the group’s order will be submitted to the vendor up front, making all sales final. Check the discussion page for updates on your order.</p>
    </div>
  )
}

export default Shipping;