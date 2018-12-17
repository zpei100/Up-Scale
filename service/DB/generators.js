const casual = require('casual');
const categories = require('./categories');

const generateStringOfWords = function(min, max) {
  return casual.array_of_words(casual.integer(min, max)).join(',');
};

const generateArrayOfWords = function(min, max) {
  return casual.array_of_words(casual.integer(min, max));
};

const generateImages = function(descriptionId) {
  let images = '';
  for (let j = 0; j <= casual.integer(1, 3); j++)
    images += `https://picsum.photos/800/450/?${casual.integer(1, 100000)},${descriptionId}\n`;
  return images;
};

const generateDescriptions = function(productId) {
  let rows = '';
  for (let j = 0; j <= casual.integer(2, 5); j++)
    rows += `${casual.title}\r${casual.description}\r${'product' + productId}\n`;
  return rows;
};

const generateAttributes = function(productId) {
  return `product${productId}\r${
    categories[casual.integer(0, 25)]
  }\rhttps://www.youtube.com/results?search_query=massdrop\r${casual.date()}\r${generateStringOfWords(5,20)}\r${generateStringOfWords(10, 50)}\n`;
};

const generateProducts = function(productId) {
  let descriptions = [];
  let attributes = {
    video: `https://www.youtube.com/results?search_query=massdrop`,
    shippingDate: casual.date(),
    included: generateArrayOfWords(5, 20),
    specs: generateArrayOfWords(10, 50)
  };

  for (let j = 0; j <= casual.integer(2, 5); j++) {
    let images = [];
    for (let j = 0; j <= casual.integer(1, 3); j++)
      images.push(
        `https://picsum.photos/800/450/?${casual.integer(
          1,
          100000
        )},${productId}\n`
      );

    descriptions.push({
      header: casual.title,
      content: casual.description,
      images
    });
  }

  return JSON.stringify({
    productName: 'product' + productId,
    category: categories[casual.integer(0, 25)],
    attributes,
    descriptions
  });
};

const generateBatch = function(generator, batchSize, startingProductId = 0) {
  
  let batch = '';
  for (let i = 0; i < batchSize; i++) {
    batch += generator(startingProductId++);
  }
  return batch;
};

const generateData = function(rounds, batchSize, generator, stream) {
  return new Promise((resolve, reject) => {
    console.time('generate');
    let round = 1;
    let productId = 0
    let batch = '';
  
  
    stream.on('finish', function() {
      console.log('stream finished. All data generated');
    });
  
    stream.on('drain', function() {
      if (round++ <= rounds) {
        stream.write(batch);
        batch = generateBatch(generator, batchSize, (productId += batchSize));
      } else {
        console.timeEnd('generate');
        stream.end();
        resolve();
      } 
    });
  
    batch = generateBatch(generator, batchSize, (productId += batchSize));
    stream.write(generateBatch(generator, batchSize, (productId -= batchSize)));
  })
};

module.exports = {
  generateImages,
  generateData,
  generateAttributes,
  generateProducts,
  generateDescriptions
};
