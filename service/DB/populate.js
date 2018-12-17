const fs = require('fs');
const path = require('path');
const { dataSize } = require('../config');

const productsStream = fs.createWriteStream(path.resolve(__dirname, './json/products.json'));
const { generateProducts, generateData } = require('./generators');

const batchSize = 1000;
const rounds = dataSize / batchSize;

generateData(rounds, batchSize, generateProducts, productsStream);