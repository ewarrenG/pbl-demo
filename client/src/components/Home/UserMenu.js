import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Menu, MenuItem, Typography, Divider, TextField, Avatar } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LookerUserAttributeBrandOptions from '../../lookerUserAttributeBrandOptions.json';

// import AppContext from '../../AppContext';
import AppContext from '../../contexts/AppContext';


const { validIdHelper } = require('../../tools');

const useStyles = makeStyles((theme) => ({
  zIndex1500: {
    zIndex: 1500
  },
  mr12: {
    marginRight: 12
  }
}))

export default function UserMenu(props) {

  const { lookerUser, onLogoutSuccess, lookerUserAttributeBrandOptions, handleUserMenuSwitch } = props
  const classes = useStyles();
  const { togglePayWallModal,
    // codeShow, 
    // toggleShow, 
    userProfile } = useContext(AppContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(lookerUser.user_attributes.brand || '');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newValue, property) => {
    setAnchorEl(null);
    if (newValue == null) {
      onLogoutSuccess({})
    } else if (newValue === 'modal') {
      togglePayWallModal({
        'show': true,
        'permissionNeeded': 'explore'
      })
    } else if (typeof newValue === 'string') {
      // handleUserMenuSwitch(newValue, property)
    }
  };
  useEffect(() => {
    // console.log('useEffect')
    setSelectedBrand(lookerUser.user_attributes.brand || '')
  }, [lookerUser]);

  return (
    <div className={`${classes.zIndex1500}`}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Avatar alt={userProfile.name} src={userProfile.imageUrl} className={classes.mr12} />

        <Typography>
          {typeof lookerUser.user_attributes.permission_level === 'string' ?
            lookerUser.user_attributes.permission_level.charAt(0).toUpperCase() + lookerUser.user_attributes.permission_level.substring(1) : ''}
        </Typography>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem autoFocus={false}>Select User Level</MenuItem>
        <MenuItem autoFocus={false} onClick={() => handleClose('basic', 'permission')}>Basic</MenuItem>
        <MenuItem autoFocus={false} onClick={() => handleClose('advanced', 'permission')}>Advanced</MenuItem>
        <MenuItem autoFocus={false} onClick={() => handleClose('premium', 'permission')}>Premium</MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={() => handleClose(null)}>Sign Out</MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={() => handleClose('modal')}>Show Monetization Modal</MenuItem>
        <Divider className={classes.divider} />
        <MenuItem>Current brand: {selectedBrand}</MenuItem>
        <MenuItem>
          <Autocomplete
            id="combo-box-usermenu"
            options={lookerUserAttributeBrandOptions}
            getOptionLabel={(option) => option.label}
            style={{ width: 300 }}
            onChange={(event) => handleClose((event.target.innerText || ''), 'brand')}
            renderInput={(params) => <TextField {...params}
              label="Change merchant brand"
              variant="outlined"
            />}
            loadingText="Loading..."
            disableautofocus="true"
            onKeyDown={(event) => event.stopPropagation()}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}