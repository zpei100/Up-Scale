import React from '../../../node_modules/react/umd/react.production.min.js';

const SocialShare = (props) => (
  <div className="socialButton">
    <ul>
      {props.icons.map((icon, i) => {
          return <div key={i} className="socialButton">
            <a href="https://twitter.com/intent/tweet?text=Get%20%2410%20off%20your%20first%20purchase%20on%20Massdrop.%20Sign%20up%20and%20check%20out%20the%20%22Massdrop%20x%20Fizan%20Compact%20Trekking%20Poles%22%3A&url=http%3A%2F%2Fdro.ps%2Fb%2FxjJiKO7AQm5O%2Ft&original_referer=https%3A%2F%2Ftwitter.com%2Fshare%3Furl%3Dhttp%253A%252F%252Fdro.ps%252Fb%252FxjJiKO7AQm5O%252Ft%26text%3DGet%2520%252410%2520off%2520your%2520first%2520purchase%2520on%2520Massdrop.%2520Sign%2520up%2520and%2520check%2520out%2520the%2520%2522Massdrop%2520x%2520Fizan%2520Compact%2520Trekking%2520Poles%2522%253A">
              <img  src={icon} width="25" height="25"/>
            </a>
          </div> 
      })}
    </ul>
  </div>
)

export default SocialShare;
