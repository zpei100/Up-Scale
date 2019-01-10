const redis = require('redis');
const axios = require('axios');
const template = require('./template');
const compression = require('compression');

const client = redis.createClient({});
const proxy = require('fastify')({ logger: false });

// const hosts = {
//   overviews: {
//     ips: ['http://52.90.204.55', 'http://18.207.190.102'],
//     idx: 0
//   },
//   productInfo: {
//     ips: ['http://34.203.222.154'],
//     idx: 0
//   },
//   gallery: {
//     ips: ['http://192.241.136.38', 'http://192.241.136.18', 'http://192.241.136.13', 'http://192.34.63.196'],
//     idx: 0
//   },
//   reviews: {
//     ips: ['http://18.188.103.44'],
//     idx: 0
//   }
// };

const hosts = {
  overviews: {
    ips: ['http://localhost:3001'],
    idx: 0
  }
}

const getHost = function(component) {
  const index = hosts[component].idx;
  hosts[component].idx =
    (hosts[component].idx + 1) % hosts[component].ips.length;
  return hosts[component].ips[index];
};

proxy.use(compression());
proxy.use(require('hide-powered-by')());

// proxy.get('/productImages/:productName', ({ params: { productName }}, res) => {
//   axios.get('http://104.248.110.27/productImages/' + productName.slice(7))
//   .then(result => {
//     res.send(result.data)
//   })
// })

proxy.get('/buy/:productName', ({ params: { productName } }, res) => {
  var htmls = {};
  var hosts = {};
  var initialStates = {};

  client.hgetall(productName, function(err, result) {
    if (result) {
      console.log('result came from cache');
      htmls.overviewsHtml = result.html;
      hosts.overviewsHost = result.host;
      initialStates.overviewsInitialState = result.overviewsInitialState;
      const page = template(hosts, initialStates, htmls);
      res.header('Content-Type', 'text/html').send(page);
    } else {
      console.log('Not cached');
      const overviewsPromise = new Promise((resolve, reject) => {
        const host = getHost('overviews');
        axios
          .get(`${host}/product/${productName}`)
          .then(({ data }) => {
            htmls.overviewsHtml = data.html;
            hosts.overviewsHost = host;
            initialStates.overviewsInitialState = JSON.stringify(data.initialState);
            
            client.hmset(productName, 'host', host, 'overviewsInitialState', initialStates.overviewsInitialState, 'html', data.html);

            resolve();
          })
          .catch(() => {
            htmls.overviewsHtml = '';
            hosts.overviewsHost = '';
            initialStates.overviewsInitialState = {};
          });
      });
    
      // const galleryPromise = new Promise((resolve, reject) => {
      //   //expect results that come back to be an object with data attribute, with keys initialState and __NAME__html
      //   const host = getHost('gallery');
      //   axios.get(`${host}/galleryhtml/${productName.slice(7)}`).then(({data}) => {
      //     // console.log('data came back from galley: ', data)
      //     htmls.galleryHtml = data;
      //     hosts.galleryHost = host;
      //     initialStates.galleryInitialState = {};
      //     resolve();
      //   }).catch(() => {
      //     htmls.galleryHtml = '';
      //     hosts.galleryHost = '';
      //     initialStates.galleryInitialState = {}
      //   });
      // });
    
      //   const productInfoPromise = new Promise((resolve, reject) => {
      //   //expect results that come back to be an object with data attribute, with keys initialState and __NAME__html
      //   const host = getHost('productInfo');
      //   axios.get(`${host}/productinfohtml/${productName.slice(7)}`).then(({data: {initialState, productinfohtml}}) => {
         
      //     htmls.productInfoHtml = productinfohtml;
      //     hosts.productInfoHost = host;
      //     initialStates.productInfoInitialState = initialState;
      //     resolve()
      //   }).catch(reject);
      // });
    
    
    
      // const reviewsPromise = new Promise((resolve, reject) => {
      //   //expect results that come back to be an object with data attribute, with keys initialState and __NAME__html
      //   const host = getHost('reviews');
      //   axios.get(`${host}/buy1/${productName.slice(7)}`).then(({data: {initialState, html}}) => {
      //     htmls.reviewsHtml = html;
      //     hosts.reviewsHost = host;
      //     initialStates.reviewsInitialState = initialState;
      //     resolve();
      //   }).catch(() => {
      //     htmls.reviewsHtml = '';
      //     hosts.reviewsHost = '';
      //     initialStates.reviewsInitialState = {};
      //   });
      // });
    
      // const allResponses = [galleryPromise, overviewsPromise, reviewsPromise, productInfoPromise];
      const allResponses = [overviewsPromise]
      Promise.all(allResponses)
        .then(() => {
          const page = template(hosts, initialStates, htmls);
          res.header('Content-Type', 'text/html').send(page);
        })
        .catch(() => res.status(404));
    }
  })
});

proxy.listen(3000, '0.0.0.0', console.log);
