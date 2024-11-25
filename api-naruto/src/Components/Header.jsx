import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <AppBar position="static" className="header-appbar">
            <Toolbar>
                <Typography variant="h6" className="header-title">
                    Naruto App
                </Typography>
                <div>
                    <Button className="header-button" component={Link} to="/">
                        Home
                    </Button>
                    <Button className="header-button" component={Link} to="/favorites">
                        Favoritos
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
