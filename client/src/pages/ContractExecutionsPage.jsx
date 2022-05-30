import React from 'react';

import Grid from '@material-ui/core/Grid';

import ContractExecutionsGrid from '../components/grids/ContractExecutionsGrid'


function ContractExecutionPage() {

  return (
    
    <div cleaaName="main">

        <Grid container item xs={12} spacing={0}>
            <ContractExecutionsGrid />
        </Grid>

        <Grid container item xs={12} spacing={0}>
            
        </Grid>
        
    </div>
  )
};

export default ContractExecutionPage;