import React, { useState, useEffect } from 'react';

import { LinearProgress } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';  

export default function DashboardCard({ title, subtitle, progresslabel, data, isLoading }) {
    
    return (

        <div className="dashboard-card">

            <div className='panel-title'>
                {title}
            </div>
            
            <div class="card-value">
            {isLoading && <div><CircularProgress size="1.5rem" /></div>} 
            {/* {isLoading && <Skeleton variant="rect" width={100} height={30}/>}  */}
            {data.length > 0 &&
                <span>
                    {data[0].value || "---"}
                </span>
            }
            </div>

            <div className="panel-subtitle">
                {subtitle}
            </div>

            {/* <Typography variant="body2" component="p">
                {progresslabel}
            </Typography>

            {isLoading
                ?<LinearProgress />
                :<LinearProgress variant="determinate" value={60} />
            } */}


        </div>

    );

}