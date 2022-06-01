const path = require('path');
const express = require("express");

const { port } = require('./config');

const app = express();

const db = require('./queries')

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Search helper
app.get('/api/search/:address', db.getSearch)

// Get rewards chart
app.get('/api/rewardschart', db.getRewardsChart)

// Get rewards ratio
app.get('/api/rewardsratio', db.getRewardsRatio)

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

//Get rewards by conract address
app.get('/api/rewards/:address', db.getContractRewards)

//Get rewards by conract address for block
app.get('/api/rewards/:address/:block', db.getContractRewardsForBlock)

// Get contracts rank
app.get('/api/contracts', db.getContractsRank)

// Get contract info
app.get('/api/contracts/:address', db.getContractInfo)

// Get contract summary
app.get('/api/contractsummary/:address', db.getContractSummary)

// Get wasm contract metadata
app.get('/api/contracts/metadata/:address', db.getContractMetadata)

// Get wasm contracts executions
app.get('/api/executions/:address', db.getContractExecutions)

// Get wasm contracts executions
app.get('/api/executions/:address/:block', db.getContractExecutionsForBlock)

// Get wasm contracts executions count by period
app.get('/api/executionscount/:address/:limit', db.getContractExecutionsByPeriod)

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

app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening on ${port}`);
});