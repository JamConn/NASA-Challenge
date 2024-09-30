import React from 'react';
import { AppBar, Box, Toolbar, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Navigation() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="logo" component={Link} to="/">
                        <img src={logo} alt="logo" style={{ width: '120px', height: '60px' }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />

                    <Button color="inherit" component={Link} to="/near-miss">Near Miss</Button>
                    <Button color="inherit" component={Link} to="/gallery-page">Gallery</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navigation;