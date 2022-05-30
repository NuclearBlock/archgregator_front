import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function Page404() {


    return (
        
        <div className="main">

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <div className="main-title">
                        <h1>Page not found</h1>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <div class="not-found ">
                        <p>404</p>
                    </div>
                </Grid>
            </Grid>

        </div>
        
    );
}
