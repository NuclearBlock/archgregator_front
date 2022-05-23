import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: '100%',
      maxHeight: '150px',
    },
    card: {
      margin: '0 2px 3px 2px',
      height: '150px',
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

  

export default function DashboardCard3() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;


    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {

      let rewardsUrl = '/api/gastoday'
      fetch(rewardsUrl)
      .then((response) => response.json())
      .then((data) => {
          setIsLoading(false);
          setData(data);
      })
      .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.log(error);
      });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    return (

    <Card variant="outlined" square className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                GAS USED
            </Typography>
            <Typography variant="h5" component="h2">
                {data.map((item, i) => <span>{item.gas_today?item.gas_today:0}</span>)[0]}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                today
            </Typography>

            <Typography variant="body2" component="p">
            Active:
            </Typography>
            <LinearProgress variant="determinate" value={60} />
        </CardContent>
    </Card>


    );

}