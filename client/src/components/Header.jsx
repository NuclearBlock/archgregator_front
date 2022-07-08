import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import logo from '../logo.png'


export default function Header() {

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const [searchString, setSearchString] = React.useState("");

    const handleEsc = event => {
        if (event.key === "Escape") {
            setSearchString("");
        }
    };

    const handleSearchResult = data => {
        setSearchString("");
        setOpen(false);
        if (data[0]) {
            let url = '/contracts/' + data[0].contract_address;
            navigate(url, { replace: true });
        } else {
            navigate('not-found', { replace: true });
        }
    };

    const handleSearchSubmit = event => {
        event.preventDefault();
        if (searchString) {
            setOpen(!open);
            let apiUrl = '/api/search/' + searchString;
            fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                handleSearchResult(data);
            })
        }    
    };

    return (

    <header>
      
            <Container maxWidth="false">
                <Grid container >
                    <Grid item xs={4} sm={3}>
                        <div id="logo">
                            <Link component={RouterLink} to="/">
                                <img src={logo} alt="Archgregator" />
                            </Link>
                        </div> 
                    </Grid>   

                    <Grid item xs={8} sm={6}>
                        <div id="search">
                            <form onSubmit={handleSearchSubmit}>
                                <input 
                                    placeholder="Search by contract address"
                                    value={searchString}
                                    name="searchString"
                                    onChange={(e) => setSearchString(e.target.value)}
                                    onKeyUp={handleEsc}
                                />
                                <button id="search-button" type="submit">
                                    <SearchIcon fontSize="small"/>
                                </button>
                        </form>    
                        </div>
                    </Grid>

                    <Grid item sm={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        
                    </Grid>

                </Grid>
            </Container>

            <Backdrop open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>

    </header>
  );
}
