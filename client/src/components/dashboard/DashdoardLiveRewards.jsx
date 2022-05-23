import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  

export default function DashdoardLiveRewards() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
<>
    {/* <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Current Protocol Rewards
            </Typography>

        </CardContent>
    </Card> */}

    

    <ResponsiveContainer width="100%" height="100%">
      <Card className={classes.root}>

      <Typography className={classes.title} color="textSecondary" gutterBottom>
        10 Days Rewards Distribution
      </Typography>
      
      <AreaChart
        width={550}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        10 Days Rewards Distribution
      </Typography>

      </Card>
    </ResponsiveContainer>
    </>

    );

}