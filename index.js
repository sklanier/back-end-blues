const server = require('./server.js');
const helmet = require('helmet');

server.listen(4000, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n');
});

server.use(helmet());
server.use(morgan('dev'));