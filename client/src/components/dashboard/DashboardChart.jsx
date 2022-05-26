import React, { useState, PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: '100%',
      maxHeight: '350px',
      textAlign: 'center',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });




export default function DashdoardChart() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (

      <>

    <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Live Chart
            </Typography>

        </CardContent>
    </Card>



</>


    );

}