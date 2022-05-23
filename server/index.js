const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./queries')

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Search helper
app.get('/api/search/:address', db.getSearch)

// Get contracts info for dashboard
app.get('/api/contractscount', db.getContractsCount)

// Get developers info for dashboard
app.get('/api/developerscount', db.getCountDevelopers)

// Get gas info for dashboard
app.get('/api/gastoday', db.getGasToday)

// Get rewards info for dashboard
app.get('/api/rewardstoday', db.getRewardsToday)

// Get rewards rank
app.get('/api/rewards', db.getRewardsRank)

//Get rewards by conreact address
app.get('/api/rewards/:address/:limit', db.getContractRewards)

// Get wasm contracts rank
app.get('/api/contracts', db.getContractsRank)

// Get wasm contract info
app.get('/api/contracts/:address', db.getContractInfo)

// Get wasm contract metadata
app.get('/api/contracts/metadata/:address', db.getContractMetadata)

// Get wasm contracts executions
app.get('/api/executions/:address/:limit', db.getContractExecutions)

// Get wasm codes rank
app.get('/api/codes', db.getCodesRank)

// Get wasm code by CodeID
app.get('/api/codes/:id', db.getCodeById)

app.get("/api", (request, response) => {
    response.json({ message: "Hello from Archgregator!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});