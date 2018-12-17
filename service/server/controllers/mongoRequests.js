const axios = require('axios');
const host = process.ENV ? process.ENV.HOST : 'http://localhost:3001'

//insert product route:
//verified working
const dummyProduct = {
  "productName": "keyboard",
  "category": "gaming",
  "attributes": {
    "video": "some random url fake",
    "shippingDate": "today",
    "included": ["partone", "parttwo"],
    "specs": ["specone", "spectwo", "specthree"]
  },
  "descriptions": [
    {
      "header": "this is the title of the first description",
      "content": "hello this is hello world",
      "images": [
        "image url number one",
        "image url number two",
        "image url number three",
        "image url number four"
      ]
    }
  ]
};

axios.post(`${host}/mongo/insertProduct`, dummyProduct).then(res => console.log(res));

//--------------------------------------------------------------------------------------------------------

// get product route:
// verified working
const productName = 'product1234';
axios.get(`${host}/mongo/getProduct/${productName}`).then(res => console.log(res));

//--------------------------------------------------------------------------------------------------------

//update shipping route:
//verified working
const newShippingDate = {
  "productName": "keyboard",
  "shippingDate": "a new day, after update",
};

axios.post(`${host}/mongo/updateShipping`, newShippingDate).then(res => console.log(res));

//--------------------------------------------------------------------------------------------------------

//update descriptions route:
//verified working
const newDescriptions = {
  "productName": "keyboard",
  "descriptions": [
    {
      "header": "this is the title of the first description after udpate",
      "content": "hello this is hello world after udpate",
      "images": [
        "image url number one after udpate",
        "image url number two",
        "image url number three",
        "image url number four"
      ]
    }
  ]
};

axios.post(`${host}/mongo/updateDescriptions`, newDescriptions).then(res => console.log(res))

//--------------------------------------------------------------------------------------------------------

//delete route:
//verified working
const productName = {
  data: {
    productName: 'keyboard'
  }
};
axios.delete(`${host}/mongo/deleteProduct`, productName)