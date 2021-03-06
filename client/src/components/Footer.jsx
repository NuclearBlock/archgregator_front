import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import Twitter from '@material-ui/icons/Twitter';


const useStyles = makeStyles((theme) => ({
    root: {
    },
    icon: {
        color: '#333',
        margin: '15px',
    },
}));

export default function Footer() {

    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();
    
    return(

        <footer className='footer'>

            <Container maxWidth="false">
                <Grid container spacing={0}>
                    
                    <Grid item xs={2} spacing={0}>
                        
                    </Grid>

                    <Grid item xs={10} spacing={0}>

                        <div class="footer-right">

                            <p>For Archway community</p>
                            <span>From </span><b>Nuclear Block [one]</b>

                            <hr/>

                            <a href="https://t.me/nuclearblock" target="_blank" class="footer-icon">
                                <TelegramIcon fontSize="medium" className={classes.icon}/>
                            </a>

                        </div>

                    </Grid>

                </Grid>
            </Container>

        </footer>
    );
  
}
