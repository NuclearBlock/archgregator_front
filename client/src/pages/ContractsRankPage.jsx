import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ContractsRankGrid from '../components/grids/ContractsRankGrid'
import ControlPanel2 from '../components/panels/ControlPanel2'


function ContractsRankPage() {

    return (

        <div className="main">

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={2}>
                    <div className="main-title">
                        <h1>Smart contracts list</h1>
                    </div>
                </Grid>
            </Grid>

            <Grid container item xs={12} spacing={0}>
                <Grid item xs={12} sm={6} spacing={0} >
                    
                </Grid>
                <Grid item xs={12} sm={6} spacing={0} >
                    {/* <ParametersBlock /> */}
                </Grid>
            </Grid>

            <Grid container item xs={12} spacing={0}>
                <ContractsRankGrid/>
            </Grid>
            
            <Grid container item xs={12} spacing={0}>
                
            </Grid>

      </div>

    );
}

export default ContractsRankPage;