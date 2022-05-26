import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { LinearProgress } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
      minWidth: '100%',
      maxHeight: '150px',
    },
    card: {
      margin: '0 2px 3px 2px',
      height: '110px',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  

export default function DashboardCard({ title, subtitle, progresslabel, data, isLoading }) {

    const classes = useStyles();
    
    return (

    <Card variant="outlined" square className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {title}
            </Typography>

            {isLoading && <div><CircularProgress size="1rem" /></div>} 
            {data.length > 0 &&
              <Typography variant="h5" component="h2">
                {data[0].value || "---"}
              </Typography>
            }

            <Typography className={classes.pos} color="textSecondary">
                {subtitle}
            </Typography>

            {/* <Typography variant="body2" component="p">
              {progresslabel}
            </Typography>

            {isLoading
              ?<LinearProgress />
              :<LinearProgress variant="determinate" value={60} />
            } */}

        </CardContent>
    </Card>


    );

}