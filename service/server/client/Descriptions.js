import React from '../../node_modules/react/umd/react.production.min.js';

export default function({descriptions}) {
  return (
  <div>
    {descriptions.map(({header, content, images}, idx) => 
      <div  key={idx} className="container col-sm-6 m-0 p-0">
        <div className="my-3">
          <div className="font-weight-bold mb-3">{header}</div>
          <div>{content}</div>
        </div>
        <div className="container p-0">{images.map((image, idx) => {
          return idx <= 1 ? <img key={idx} className='col-sm-6 w-100 p-0' src={image}></img>
          : (images.length === 4 ? <img key={idx} className='col-sm-6 w-100 p-0' src={image}></img>
          : <div key={idx} className="row"><img className='col-sm-12 w-100 h-50' src={image}></img></div>)
        }
        )}</div>
      </div>
    )}
  </div>
  )
}

