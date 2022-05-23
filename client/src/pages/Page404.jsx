import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function Page404() {


    return (
        
        <>
            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <h1>Page not found</h1>
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <div class="404">
                        <p>404</p>
                    </div>
                </Grid>
            </Grid>

        </>
        
    );
}
