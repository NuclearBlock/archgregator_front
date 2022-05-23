import React from 'react';

import Grid from '@material-ui/core/Grid';

import ContractExecutionsGrid from '../components/grids/ContractExecutionsGrid'


function ContractExecutionPage() {

  return (
    
    <>
        {/* <Grid container item xs={12} spacing={0}>
            <Grid container item xs={12} sm={6} spacing={0} >
                
            </Grid>
            <Grid container item xs={12} sm={6} spacing={0} >
                <ParametersBlock />
            </Grid>
        </Grid> */}

        <Grid container item xs={12} spacing={0}>
            <ContractExecutionsGrid />
        </Grid>

        <Grid container item xs={12} spacing={0}>
            
        </Grid>
    </>
  )
};

export default ContractExecutionPage;