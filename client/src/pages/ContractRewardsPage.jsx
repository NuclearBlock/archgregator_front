import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import ContractRewardsGrid from '../components/grids/ContractRewardsGrid'
import ContractExecutionsGrid from '../components/grids/ContractExecutionsGrid'

import InfoPanel from '../components/panels/InfoPanel'


export default function ContractRewardsPage() {

    const params = useParams();
    
    return (
        
        <div className="main">

            <Grid container item xs={12} spacing={0}>
                <Grid item xs={12} sm={6} spacing={0} >
                    <div className="main-title">
                        <h1>Smart contract rewards</h1>
                        <span>{params.address}</span>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} spacing={0} >
                    
                </Grid>
            </Grid>

            <Grid container item xs={12} spacing={0}>
                <ContractRewardsGrid />
            </Grid>
            
            <Grid container item xs={12} spacing={0}>
                
            </Grid>

        </div>
        
    );
}
