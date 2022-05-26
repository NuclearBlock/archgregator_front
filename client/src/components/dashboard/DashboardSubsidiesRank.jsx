import React, { useState, useEffect } from 'react';
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

export default function DashboardSubsidiesRank({data, isLoading}) {

    const classes = useStyles();

    return (
    <>
    <Card variant="outlined" square className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                USER SUBSIDIES LEADERS
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
                          Subsidized
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
                                    {item.label?item.label:'Noname'}
                                </TableCell>
                                <TableCell align="right">
                                    {item.sum_calculated_rewards.toFixed(2)}
                                </TableCell>
                            </TableRow>
                          );
                      })}
                  </TableBody>
              </Table>

              <div className='dashboard-see-more'>
                <Link to='/rewards'>See more&nbsp;<LaunchIcon fontSize="small"/></Link>
              </div>
              </>
            )}

        </CardContent>
    </Card>

    </>

    );

}