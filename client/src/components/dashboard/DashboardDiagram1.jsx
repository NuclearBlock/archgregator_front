import React, { PureComponent } from 'react';
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

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#f1592a', '#cccccc', '#666666', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  

  export default function DashboardDiagram1({isLoading}) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

  

  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
        <Card variant="outlined" square className={classes.card}>
            <Typography className={classes.title} color="Primary" gutterBottom>
                REWARDS TYPE PERCENTAGE
            </Typography>

            {isLoading && <div class="dashboard-progress"><CircularProgress size="4rem" /></div>} 

            <PieChart width={380} height={220}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </Card>  
      </ResponsiveContainer>
      
    </>
  );

}