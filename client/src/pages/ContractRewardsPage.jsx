import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import ContractRewardsGrid from '../components/grids/ContractRewardsGrid'
import CopyToClipboard from '../utils/CopyToClipboard';


export default function ContractRewardsPage() {

    const params = useParams();
    
    return (
        
        <div className="main">

            <Grid container spacing={0}>
                <Grid item xs={12} spacing={0} >
                    <div className="main-title">
                        <h1>Smart contract rewards</h1>
                        <span>{params.address}</span>
                        <CopyToClipboard textToCopy={params.address} />
                    </div>
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
