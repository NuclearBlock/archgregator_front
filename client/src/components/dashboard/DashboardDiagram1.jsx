import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    root: {
      minWidth: '100%',
      maxHeight: '350px',
      textAlign: 'center',
    },
    card: {
      margin: '2px',
      height: '330px',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      padding: '15px 0 0 15px',
    },
    pos: {
      marginBottom: 12,
    },
  });


  const convertData = input => {
    const output = Object.entries(input).map(([name, value]) => ({name,value}));
    // console.log(output);
    return output;
  }

  const COLORS = ['#cccccc', '#f1592a', '#f7ab93',];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  export default function DashboardDiagram1({data, isLoading}) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [state, setState] = useState({activeIndex: 0});

    const onPieEnter = (_, index) => {
      setState({activeIndex: index});
    };

  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
        <Card variant="outlined" square className={classes.card}>
            <Typography className={classes.title} color="Primary" gutterBottom>
                REWARDS TYPE RATIO
            </Typography>

            {isLoading && <div class="dashboard-progress"><CircularProgress size="4rem" /></div>} 

            {data.length > 0 &&
              <div>
                <PieChart width={370} height={220}>
                    <Pie
                        data={convertData(data[0])}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        innerRadius={60}
                        outerRadius={100}
                        fill="#cccccc"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                    {convertData(data[0]).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
              
                <div className="pie-premium"><span></span> Premium</div>
                <div className="pie-subsidies"><span></span> Subsidized</div>
              </div>
            }
        </Card>  
      </ResponsiveContainer>
      
    </>
  );

}