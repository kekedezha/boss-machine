// Import the Express library
const express = require('express');
// Invoke the the Express library and create an instance of an Express application 
// saved under the constant variable app
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middleware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Mount '/minions', '/ideas', and '/meetings' to apiRouter. 
const minionsRouter = require ('./server/apiPathEndpoints/minions');
apiRouter.use('/minions', minionsRouter); // '/api/minions'
const ideasRouter = require ('./server/apiPathEndpoints/ideas');
apiRouter.use('/ideas', ideasRouter); // '/api/ideas'
const meetingsRouter = require ('./server/apiPathEndpoints/meetings');
apiRouter.use('/meetings', meetingsRouter); // '/api/meetings'



// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
  })
}
