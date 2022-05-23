import React, { useState, useEffect } from 'react';
import { Routes, Route, } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import CodesRankGrid from '../components/grids/CodesRankGrid'


function CodesRankPage() {

  return (
    
    <>

        <Grid container spacing={0}>
            <Grid  item xs={12} spacing={2}>
                <h1>Wasm codes list</h1>
            </Grid>
        </Grid>

        <Grid container item xs={12} spacing={0}>
            <CodesRankGrid />
        </Grid>

        <Grid container item xs={12} spacing={0}>
            
        </Grid>
    </>
  )
};

export default CodesRankPage;