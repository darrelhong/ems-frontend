import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';

export default function HidePopover() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [hideState, setHideState] = useState({
        ch: true,
        bpo: false,
        all: false,
    });

    const defaultState = ({
        ch: false,
        bpo: false,
        all: false,
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setTimeout(() => { setAnchorEl(null) }, 200)
    };

    const toggleVisibility = (event) => {
        setHideState({ ...defaultState, [event.target.name]: event.target.checked });

        handleClose();
    };

    return (
        <div>
            {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
          </Button> */}
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <VisibilityIcon />
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className="ml-4" style={{ fontSize: "11", fontWeight: "bold" }}>Toggle Visibility:</div>
                <MenuItem>
                    <Switch checked={hideState.ch} onClick={toggleVisibility} name="ch" />Mark as Hidden
                </MenuItem>
                <MenuItem>
                    <Switch checked={hideState.bpo} onClick={toggleVisibility} name="bpo" />Show to Business Partners / Hide from Attendees
                </MenuItem>
                <MenuItem>
                    <Switch checked={hideState.all} onClick={toggleVisibility} name="all" />Show to Business Partners and Attendees
                </MenuItem>
            </Menu>
        </div >
    );




}