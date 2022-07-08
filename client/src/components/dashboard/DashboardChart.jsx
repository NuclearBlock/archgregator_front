import React, { useState, PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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


export default function DashdoardChart({data, isLoading}) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    
    return (

      <>
        
            <div className="panel dashboard-leaders" style={{width:"100%"}}>
                <div className="panel-title">
                    7 DAY CONTRACT CHART
                </div>

                {isLoading && <div className="chart-progress">Loading data ...</div>} 

                {data.length == 0 && <div className="chart-progress">No data found</div>}
                
                {data.length > 0 &&
                    <ResponsiveContainer width="100%">
                        <AreaChart
                        
                        data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: -40,
                            bottom: 30,
                        }}
                        >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="date" />
                        <YAxis 
                            tick={false} 
                            type="number" 
                            // domain={['auto', 'auto']} 
                        />
                        <Tooltip />
                        <Area type="monotone" dataKey="executions" stroke="#ff5820" fill="#f7ab93" />
                        </AreaChart>
                    </ResponsiveContainer>
                }

            </div>
        
      </>


    );

}