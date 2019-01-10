import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import fastify from 'fastify';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {
  mongoGetByProductName,
  mongoInsertByProductName,
  mongoUpdateShipping,
  mongoDeleteProduct,
  mongoUpdateDescriptions
} from './controllers/mongoControllers';

const port = 3001;
// const app = express();
const app = fastify({
  logger: false
});

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../react-client/dist')
});

app.use(cors());
app.use(bodyParser());
app.use(compression());
// app.disable('etag').disable('x-powered-by');
// app.use(express.static(path.join(__dirname, '/../react-client/dist')));

//mongo routes:
app.get('/products/:productName', mongoGetByProductName);
app.post('/products', mongoInsertByProductName);
app.delete('/products', mongoDeleteProduct);
app.put('/products', mongoUpdateShipping);
app.put('/products', mongoUpdateDescriptions);

app.get('/bundle.js', function(req, res) {
  res.sendFile('bundle.js');
});

app.get('/styles.css', function(req, res) {
  res.sendFile('styles.css');
});

app.listen(port, '0.0.0.0', function() {
  console.log('listening on port 3001!');
});

// const options = {
//   key: fs.readFileSync(__dirname + '/ssl/server.key'),
//   cert: fs.readFileSync(__dirname + '/ssl/server.crt')
// };

// spdy.createServer(options, app).listen(port, error => {
//   if (error) {
//     console.error(error);
//     return process.exit(1);
//   } else {
//     console.log('Listening on port: ', port);
//   }
// });
