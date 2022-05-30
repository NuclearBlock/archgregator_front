import React, { useState, useEffect } from 'react';
import { Routes, Route, } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import CodesRankGrid from '../components/grids/CodesRankGrid'


function CodesRankPage() {

  return (
    
    <div className='main'>

        <Grid container spacing={0}>
            <Grid  item xs={12} spacing={2}>
                <div className="main-title">
                    <h1>Wasm codes list</h1>
                </div>
            </Grid>
        </Grid>

        <Grid container item xs={12} spacing={0}>
            <CodesRankGrid />
        </Grid>

        <Grid container item xs={12} spacing={0}>
            
        </Grid>
        
    </div>
  )
};

export default CodesRankPage;