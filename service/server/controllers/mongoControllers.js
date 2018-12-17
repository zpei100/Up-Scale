import { renderToString } from '../../node_modules/react-dom/cjs/react-dom-server.node.production.min.js';
import React from '../../node_modules/react/umd/react.production.min.js';

import Descriptions from './../client/Descriptions';
import Overviews from '../../react-client/src/components/Overviews.jsx';
import Product from '../../DB/mongoClient/client';

export const mongoGetByProductName = function({params: {productName}}, res) {
  if (!productName.startsWith('product')) productName = 'productName' + productName;
  Product.findOne({productName}).lean().then(product => {
    const {attributes: { included, specs, shippingDate, video, productName }, descriptions} = product;
    const html = renderToString(<Descriptions descriptions={descriptions} />);
    const initialState = { productName, included, specs, shippingDate, video, html };
    const overviewsHtml = `
    <div id="product-overviews-app" style="margin-left: 15vw">
      ${renderToString(<Overviews initialState={initialState}/>)}
    </div>
    `;
    res.status(200).send({initialState, html: overviewsHtml});
  });
};

export const mongoInsertByProductName = function(req, res) {
  const {productName, category, attributes, descriptions } = req.body;

  Product.create({
    productName,
    category,
    attributes,
    descriptions
  }, function(err, result) {
    if (err) res.status(404);
    else res.status(200).send(result);
  })
};

export const mongoUpdateShipping = function(req, res) {
  const { shippingDate, productName } = req.body;
  
  Product.findOneAndUpdate({productName}, {$set: {'attributes.shippingDate': shippingDate}}, function(err, result) {
    if (err) res.status(404);
    else res.status(200).send(result);
  })
};

export const mongoUpdateDescriptions = function(req, res) {
  const { descriptions, productName } = req.body;

  Product.findOneAndUpdate({productName}, {$set: {descriptions}}, function(err, result) {
    if (err) res.status(404);
    else res.status(200).send(result);
  })
}

export const mongoDeleteProduct = function(req, res) {
  console.log('req body: ', req.body)
  const { productName } = req.body;
  console.log('product name: ', productName)

  Product.deleteOne({productName}, function(err, result) {
    if (err) res.status(404);
    else res.status(200).send(result);
  })
}