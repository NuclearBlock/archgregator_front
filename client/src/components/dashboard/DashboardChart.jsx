import React, { useState, PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
//import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      minWidth: '100%',
      maxHeight: '350px',
      textAlign: 'center',
    },
    card: {
      margin: '2px',
      // minWidth: '100%',
      height: '330px',
    },  
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


  const data1 = [
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



export default function DashdoardChart({data, isLoading}) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (

      <>

<ResponsiveContainer width="100%" height="100%">
    <Card variant="outlined" square className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                REWARDS CHART
            </Typography>

            {isLoading && <div class="dashboard-progress">Loading data ...</div>} 

            {data.length > 0 &&
              <AreaChart
                width={700}
                height={280}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: -40,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis tick={false} type="number" domain={['auto', 'auto']} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#ff5820" fill="#f7ab93" />
              </AreaChart>
            }

        </CardContent>
    </Card>

    </ResponsiveContainer>



</>


    );

}