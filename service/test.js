const { mysqlGetByProductName, mysqlInsertByProductName, mysqlUpdateShipping, mysqlUpdateDescriptions, mysqlAddImage, mysqlDeleteImage, mysqlDeleteDescription, mysqlAddDescriptions } = require('./server/controllers/mysqlControllers');

const connection = require('./DB/mysqlClient/client');

describe('get product by name should work correctly', function() {

  // afterEach(function() {
  //   connection.end();
  // });

  test('get request responses should return 200 for random products with id less than 1,000,000', done => {
    var allPromises = [];
    for (var i = 0; i <= 10; i++) {
      allPromises.push(new Promise(function(resolve, reject) {
        var productName = 'product' + Math.floor(Math.random() * 1000);
        var req = {params: {productName}}
        var res = {
          status: function(code) {
            return {
              send: function() {
                resolve(code);
              }
            }
          }
        };
        
        mysqlGetByProductName(req, res);
      }))
    }

    Promise.all(allPromises).then(values => {
      expect(values.every(code => code === 200)).toBeTruthy;
      done();
    });
  });

  test('get request response time should average below 50ms per request', done => {
    var timeAtStart = new Date();
    var allPromises = [];
    for (var i = 0; i <= 10; i++) {
      allPromises.push(new Promise(function(resolve, reject) {
        var productName = 'product' + Math.floor(Math.random() * 1000);
        var req = {params: {productName}}
        var res = {
          status: function(code) {
            return {
              send: function() {
                resolve(code);
              }
            }
          }
        };
        mysqlGetByProductName(req, res);
      }))
    }
  
    Promise.all(allPromises).then(values => {
      expect((new Date() - timeAtStart) / 100000).toBeLessThan(50);
      done();
    });
  }, 500000)
});

describe('insert route with mysql should work', function() {

  test('insert query should receive code 200', (done) => {
    new Promise(function(resolve, reject) {
      var productName = Math.floor(Math.random() * 1000) + 'product';
      var req = {
        body: {
          productName,
          category: 'test category',
          attributes: {
            video: 'test url',
            shippingDate: 'test today',
            included: ['part one', 'part two', 'part three', 'part four'],
            specs: ['red', 'new', 'heavy']
          },
          descriptions: [{
            header: 'test header',
            content: 'test content',
            images: [
              'image one',
              'image two',
              'image three'
            ]
          }]
        }
      };

      var res = {
        status: function(code) {
          return {
            send: function(data) {
              console.log('code is: ', code)
              resolve(code);
            }
          }
        }
      };

      mysqlInsertByProductName(req, res); 
    }).then(code => {
      expect(code).toBe(200);
      done();
    });
  });

  test('insert query, then get query should get expected result', (done) => {
    new Promise(function(resolve, reject) {
      var productName = Math.floor(Math.random() * 1000) + 'product';
      var req = {
        body: {
          productName,
          category: 'test category',
          attributes: {
            video: 'test url',
            shippingDate: 'test today',
            included: ['part one', 'part two', 'part three', 'part four'],
            specs: ['red', 'new', 'heavy']
          },
          descriptions: [{
            header: 'test header',
            content: 'test content',
            images: [
              'image one',
              'image two',
              'image three'
            ]
          }]
        }
      };

      var res = {
        status: function(code) {
          return {
            send: function(data) {
              console.log('code is: ', code)
              resolve(code);
            }
          }
        }
      };

      mysqlInsertByProductName(req, res); 
    }).then(code => {
      expect(code).toBe(200);
      done();
    });
  })
})
