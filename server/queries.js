const Pool = require('pg').Pool
const pool = new Pool({
  user: 'archway',
  host: 'localhost',
  database: 'archway',
  password: 'password',
  port: 5432,
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
    pool.query('SELECT COUNT(*) AS contracts_count FROM wasm_contract;', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getCountDevelopers = (request, response) => {    
  pool.query('SELECT COUNT(developer_address) AS developers_count FROM contract_metadata;', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}
const getGasToday = (request, response) => {    
  pool.query('SELECT SUM(gas_used) AS gas_today FROM wasm_execute_contract WHERE executed_at > now()::date - 1;', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}
const getRewardsToday = (request, response) => {    
  pool.query('SELECT SUM(distributed_rewards_amount) as reward_today FROM contract_reward WHERE reward_date > now()::date - 1;', (error, results) => {
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

  let qstr = 'SELECT cr.contract_address, wc.label, count(cr.contract_address), sum(cr.contract_rewards_amount) AS sum_calculated_rewards, sum(cr.inflation_rewards_amount) AS sum_inflation_rewards, sum(cr.distributed_rewards_amount) AS sum_distributed_rewards, sum(cr.leftover_rewards_amount) AS leftover_rewards, sum(cr.gas_consumed::decimal) AS sum_gas_consumed FROM contract_reward cr LEFT JOIN wasm_contract wc ON cr.contract_address=wc.contract_address' + where + ' GROUP BY cr.contract_address, wc.label ORDER BY sum_distributed_rewards DESC LIMIT $1;'
  //console.log(qstr)

  pool.query(qstr, [limit], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
  })
}

const getContractRewards = (request, response) => {
  const limit = request.params.limit
  if (!limit && limit > 100) {
    limit = 100
  }
  const contractAddress = request.params.address
  pool.query('SELECT * FROM contract_reward WHERE contract_address = $1 ORDER BY height DESC LIMIT $2;', [contractAddress, limit], (error, results) => {
      if (error) {
      throw error
      }
      response.status(200).json(results.rows)
  })
}

const getContractExecutions = (request, response) => {
  const limit = request.params.limit
  if (!limit && limit > 100) {
    limit = 100
  }
  const contractAddress = request.params.address
  pool.query('SELECT * FROM wasm_execute_contract WHERE contract_address = $1 ORDER BY height DESC LIMIT $2;', [contractAddress, limit], (error, results) => {
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

const getContractMetadata = (request, response) => {
  const contractAddress = request.params.address

  pool.query('SELECT * FROM contract_metadata WHERE contract_address = $1;', [contractAddress], (error, results) => {
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
    getContractInfo,
    getContractMetadata,
    getContractExecutions,
  }

