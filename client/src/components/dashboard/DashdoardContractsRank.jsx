import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { LinearProgress } from '@material-ui/core';

import LaunchIcon from '@material-ui/icons/Launch';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    maxHeight: '150px',
  },
  card: {
    margin: '2px',
    height: '330px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

  

export default function DashdoardContractsRank({data, isLoading}) {

    const classes = useStyles();

    // const [data, setData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);

    // const fetchData = () => {
    //     let rewardsUrl = '/api/contracts/?limit=5'
    //     fetch(rewardsUrl)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setIsLoading(false);
    //         setData(data);
    //     })
    //     .catch((error) => {
    //         setIsLoading(false);
    //         setIsError(true);
    //         console.log(error);
    //     });
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // if (isLoading) {
    //     return (
    //       <div>
    //         Loading data...
    //         <CircularProgress />
    //       </div>
    //     );
    // }

    return (
<>
    <Card variant="outlined" square className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              MOST EXECUTABLE CONTRACTS
            </Typography>
            <Typography variant="body2" component="p">
              # 
            </Typography>

            {isLoading && <div class="dashboard-progress"><CircularProgress size="4rem" /></div>} 
            
            {data.length > 0 && (
              <>
              <Table className={classes.table} size="small" aria-label="sticky table">
                <TableHead>
                    <TableRow>
                      <TableCell width="10%">
                        #
                      </TableCell>
                      <TableCell>
                        Contract
                      </TableCell>
                      <TableCell align="right">
                        Executed
                      </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                    .map((item, i) => {
                        return (
                          <TableRow key={item.id}>
                              <TableCell>
                                  {i+1}
                              </TableCell>
                              <TableCell>
                                  {item.label || 'Noname'}
                              </TableCell>
                              <TableCell align="right">
                                  {item.executed}
                              </TableCell>
                          </TableRow>
                        );
                    })}
                </TableBody>
              </Table>

              <div className='dashboard-see-more'>
                <Link to='/contracts'>See more&nbsp;<LaunchIcon fontSize="small"/></Link>
              </div>
              </>
            )}          
          
        </CardContent>
    </Card>

  
    </>

    );

}