const Pool = require('pg').Pool

const { dbHost, dbPort, dbDatabase, dbUser, dbPassword } = require('./config');
const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbDatabase,
  password: dbPassword,
  port: dbPort,
})

const getSearch = (request, response) => { 
  const address = request.params.address
  pool.query('SELECT contract_address FROM wasm_contract WHERE contract_address = $1;', [address], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getContractsCount = (request, response) => {   
    pool.query('SELECT COUNT(*) AS value FROM wasm_contract;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getCountDevelopers = (request, response) => {    
  pool.query('SELECT COUNT(developer_address) AS value FROM contract_metadata;', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}
const getGasToday = (request, response) => {    
  pool.query('SELECT SUM(gas_used) AS value FROM wasm_execute_contract WHERE executed_at > now()::date - 1;', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}
const getRewardsToday = (request, response) => {    
  pool.query('SELECT SUM(distributed_rewards_amount) as value FROM contract_reward WHERE reward_date > now()::date - 1;', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}


const getCodesRank = (request, response) => {
    pool.query('SELECT * FROM wasm_code ORDER BY height ASC LIMIT 15', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCodeById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM wasm_code WHERE code_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getContractsRank = (request, response) => {

  let limit = 50;
  for (let parameter in request.query) { 
    let value = request.query[parameter]
    if (parameter == 'limit') { 
      if (value > 0 && value <= 100)
      limit = value;
    }  
  }

  pool.query('SELECT wc.contract_address, wc.creator, wc.label, count(wec.contract_address) as executed, sum(wec.gas_used) as gas_used, sum(wec.fees_amount) fees FROM wasm_contract wc LEFT JOIN wasm_execute_contract wec ON wc.contract_address = wec.contract_address GROUP BY wc.contract_address, wc.creator, wc.label ORDER BY executed DESC LIMIT $1;', [limit], (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
}

const getRewardsRank = (request, response) => {
  let conditions = [];
  let limit = 100;
  for (let parameter in request.query) {
    let value = request.query[parameter]
    if (parameter == 'type') { 
      if (value == '2') {
          conditions.push(' cr.gas_rebate_to_user = false ')
      } else if (value == '3') {
          conditions.push(' cr.gas_rebate_to_user = true ');
      }    
    }  
    if (parameter == 'premium') { 
      let conditionString = ' cr.collect_premium = ' + value + ' '
      conditions.push(conditionString)
    }  
    if (parameter == 'startdate') { 
      let conditionString = ' cr.reward_date > \'' + value + '\' '
      conditions.push(conditionString)
    }  
    if (parameter == 'enddate') { 
      let conditionString = ' cr.reward_date < \'' + value + '\' '
      conditions.push(conditionString)
    }  
    if (parameter == 'limit') { 
      if (value > 0 && value <= 100)
      limit = value;
    }  
  }
  
  let where = ''
  conditions.forEach(function(condition, i) {
      //console.log(condition);
      if (i>0) { 
        where += ' AND '
      } else {
        where += ' WHERE '
      }  
      where += condition;
  });

  // let qstr = 'SELECT cr.contract_address, wc.label, count(cr.contract_address), sum(cr.contract_rewards_amount) AS sum_calculated_rewards, sum(cr.inflation_rewards_amount) AS sum_inflation_rewards, sum(cr.distributed_rewards_amount) AS sum_distributed_rewards, sum(cr.leftover_rewards_amount) AS leftover_rewards, sum(cr.gas_consumed::decimal) AS sum_gas_consumed FROM contract_reward cr LEFT JOIN wasm_contract wc ON cr.contract_address=wc.contract_address' + where + ' GROUP BY cr.contract_address, wc.label ORDER BY sum_distributed_rewards DESC LIMIT $1;'
  
  let queryStr = 'SELECT cr.contract_address, wc.label, count(cr.contract_address) AS calculations, sum(cr.contract_rewards_amount) AS sum_calculated_rewards FROM contract_reward cr LEFT JOIN wasm_contract wc ON cr.contract_address=wc.contract_address' + where + ' GROUP BY cr.contract_address, wc.label ORDER BY sum_calculated_rewards DESC LIMIT $1;'
  //console.log(qstr)

  pool.query(queryStr, [limit], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
  })
}

const getContractRewards = (request, response) => {
  let limit = 100;
  for (let parameter in request.query) { 
    let value = request.query[parameter]
    if (parameter == 'limit') { 
      if (value > 0 && value <= 100)
      limit = value;
    }  
  }
  const contractAddress = request.params.address
  
  // let queryStr = 'SELECT * FROM contract_reward WHERE contract_address = $1 ORDER BY height DESC LIMIT $2;';
  let queryStr = 'SELECT distinct(height), reward_date, contract_address, distributed_rewards_amount FROM contract_reward WHERE contract_address = $1 ORDER BY height DESC LIMIT $2;';
  pool.query(queryStr, [contractAddress, limit], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getContractRewardsForBlock = (request, response) => {
  const contractAddress = request.params.address
  const block = request.params.block

  let queryStr = 'SELECT * FROM contract_reward WHERE contract_address = $1 AND height = $2;';
  pool.query(queryStr, [contractAddress, block], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getContractExecutions = (request, response) => {
  let limit = 100;
  for (let parameter in request.query) { 
    let value = request.query[parameter]
    if (parameter == 'limit') { 
      if (value > 0 && value <= 100)
      limit = value;
    }  
  }
  const contractAddress = request.params.address
  pool.query('SELECT * FROM wasm_execute_contract WHERE contract_address = $1 ORDER BY height DESC LIMIT $2;', [contractAddress, limit], (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
}

const getContractExecutionsForBlock = (request, response) => {
  const contractAddress = request.params.address
  const block = request.params.block
  pool.query('SELECT * FROM wasm_execute_contract WHERE contract_address = $1 AND height = $2;', [contractAddress, block], (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
}

const getContractExecutionsByPeriod = (request, response) => {

  const limit = request.params.limit
  if (!limit && limit > 10) {
    limit = 10
  }

  const contractAddress = request.params.address
  pool.query("SELECT to_char(executed_at::date, 'mm/dd/YY') AS date, count(tx_hash) AS executed FROM wasm_execute_contract WHERE contract_address = $1 GROUP BY executed_at::date ORDER BY date LIMIT $2;", [contractAddress, limit], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getContractInfo = (request, response) => {
  const contractAddress = request.params.address

  pool.query('SELECT * FROM wasm_contract WHERE contract_address = $1;', [contractAddress], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
  })

}


const getContractSummary = (request, response) => {
  const contractAddress = request.params.address

  const queryStr = 'SELECT * FROM \
  (SELECT COUNT(tx_hash) AS total_executed FROM wasm_execute_contract WHERE contract_address = $1) T1, \
  (SELECT COUNT(DISTINCT sender) AS unique_executors FROM wasm_execute_contract WHERE contract_address = $1) T2, \
  (SELECT ROUND(SUM(contract_rewards_amount)::numeric, 0) AS rewards_earned FROM contract_reward WHERE contract_address = $1 AND gas_rebate_to_user = false) T3, \
  (SELECT ROUND(SUM(contract_rewards_amount)::numeric, 0) AS subsidized_fees FROM contract_reward WHERE contract_address = $1 AND gas_rebate_to_user = true) T4;'

  pool.query(queryStr, [contractAddress], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const getContractMetadata = (request, response) => {
  const contractAddress = request.params.address

  pool.query('SELECT * FROM contract_metadata WHERE contract_address = $1;', [contractAddress], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
  })

}

const getRewardsRatio = (request, response) => {
  const queryStr = 'SELECT * FROM \
    (SELECT SUM(contract_rewards_amount) AS standart FROM contract_reward WHERE collect_premium = false AND gas_rebate_to_user = false) T2, \
    (SELECT SUM(contract_rewards_amount) AS premium FROM contract_reward WHERE collect_premium = true) T3, \
    (SELECT SUM(contract_rewards_amount) AS subsidies FROM contract_reward WHERE gas_rebate_to_user = true) T4;'
  
    pool.query(queryStr, (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).json(results.rows)
  })

}

const getRewardsChart = (request, response) => {
  const queryStr = "SELECT ROUND(SUM(contract_rewards_amount)::numeric, 2) AS amount, to_char(reward_date, 'mm/dd/YY') AS date FROM contract_reward WHERE reward_date > now()::date - 7 GROUP BY reward_date;";

    pool.query(queryStr, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

module.exports = {
    getSearch,
    getContractsCount,
    getCountDevelopers,
    getGasToday,
    getRewardsToday,
    getCodesRank,
    getCodeById,
    getContractsRank,
    getRewardsRank,
    getContractRewards,
    getContractRewardsForBlock,
    getContractInfo,
    getContractSummary,
    getContractMetadata,
    getContractExecutions,
    getContractExecutionsForBlock,
    getContractExecutionsByPeriod,
    getRewardsRatio,
    getRewardsChart,
  }

