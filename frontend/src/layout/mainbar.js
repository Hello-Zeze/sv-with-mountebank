import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { ShoppingCartRounded }from '@material-ui/icons';
import ShoppingCartWidget from '../shopping-cart/ShoppingCartWidget';

import './mainbar.css';

export default class MainBar extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id="main-app-bar">
                <AppBar position="static" color="default">
                    <Toolbar>                    
                        <Typography variant="h6" noWrap>
                            Duck 'R' Us
                        </Typography>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={1} color="secondary">
                                <ShoppingCartRounded />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}