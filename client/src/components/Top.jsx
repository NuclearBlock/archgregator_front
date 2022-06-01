import React from 'react';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';

export default function Header() {

return (
    <div className='top'>
        <>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid  item xs={12} spacing={2}>
                        <span>Archway Protocol Smart contract data aggregator</span>
                    </Grid>
                </Grid>
            </Container>
        </>
    </div>
  );
}
