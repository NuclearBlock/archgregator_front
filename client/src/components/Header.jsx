import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

import logo from '../logo.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Header() {

    const classes = useStyles();

    let navigate = useNavigate();
    function goTo(url) {
        console.log('navigate to : ' + url)
        navigate(url, { replace: true });
    }

    const [searchString, setSearchString] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleSearch = event => {
        //console.log(event.target.value)
        setSearchString(event.target.value);
    };

    const handleSearchClick = event => {
        if (event.key === 'Enter') {
            console.log(event.target.value)
        }
    };

    useEffect(() => {
        let apiUrl = '/api/search/' + searchString;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            setSearchResults(data);
        })
    }, [searchString]);

    useEffect(() => {
        console.log(searchResults)
        if (searchResults[0]) {
            let url = '/contracts/' + searchResults[0].contract_address;
            console.log('url = ' + url);
            goTo(url);
        }     
        
    }, [searchResults]);

    return (

    <header>
      
            <Container maxWidth="lg">
                <Grid container >
                    <Grid item xs={4} sm={3}>
                        <div id="logo">
                            <Link component={RouterLink} to="/">
                                <img src={logo} alt="Archgregator" />
                            </Link>
                        </div> 
                    </Grid>   

                    <Grid item xs={8} sm={6}>
                        <div className="search">
                            <input 
                                placeholder="Search by contract address"
                                value={searchString}
                                onChange={handleSearch}
                                // onKeyUp={handleSearchClick}
                            />
                            <span className="search-icon">
                                <SearchIcon fontSize="small"/>
                            </span>
                        </div>
                    </Grid>

                    <Grid item sm={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        
                    </Grid>

                </Grid>
            </Container>

    </header>
  );
}
