import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function PageSearchNotFound() {

    return (      

        <div className="main">

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <div className="main-title">
                        <h1>No Result found</h1>
                    </div>               
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <div className="not-found ">
                        <p>Not found</p>
                    </div>
                </Grid>
            </Grid>

        </div>     
    );
}
