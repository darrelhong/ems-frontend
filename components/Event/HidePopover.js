import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';

import { eventToHideToggle, updateEventHidden } from '../../lib/functions/eventOrganiser/eventFunctions';

export default function HidePopover({ event }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [hideState, setHideState] = useState({
        hideBoth: false,
        hideFromAttendee: false,
        showBoth: false,
    });

    useEffect(() => {
        const eventHideToggleStatus = eventToHideToggle(event);
        setHideState({
            hideBoth: eventHideToggleStatus == 'hideBoth',
            hideFromAttendee: eventHideToggleStatus == 'hideFromAttendee',
            showBoth: eventHideToggleStatus == 'showBoth',
        });
    }, [])

    const defaultState = ({
        hideBoth: false,
        hideFromAttendee: false,
        showBoth: false,
    });

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setTimeout(() => { setAnchorEl(null) }, 200)
    };

    const toggleVisibility = async (e) => {
        const newHideState = { ...defaultState, [e.target.name]: e.target.checked };
        setHideState(newHideState);
        // can use the console loggin to check if properly updated
        // console.log('event before:');
        // console.log(event);
        const newEvent = await updateEventHidden(event, newHideState);
        // console.log('event after:');
        // console.log(newEvent);
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
                    <Switch checked={hideState.hideBoth} onClick={toggleVisibility} name="hideBoth" />Hide from All
                </MenuItem>
                <MenuItem>
                    <Switch checked={hideState.hideFromAttendee} onClick={toggleVisibility} name="hideFromAttendee" />Show to Business Partners / Hide from Attendees
                </MenuItem>
                <MenuItem>
                    <Switch checked={hideState.showBoth} onClick={toggleVisibility} name="showBoth" />Show to Business Partners and Attendees
                </MenuItem>
            </Menu>
        </div >
    );




}