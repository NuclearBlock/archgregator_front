import React from 'react';

import Grid from '@material-ui/core/Grid';
import RewardsRankGrid from '../components/grids/RewardsRankGrid'

export default function RewardsRankPage() {
    
    return (
        
        <>
            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <h1>Smart contract rewards rank</h1>
                </Grid>
            </Grid>

            <Grid container item xs={12} spacing={0}>
                <RewardsRankGrid />
            </Grid>
            

        </>
        
    );
}
