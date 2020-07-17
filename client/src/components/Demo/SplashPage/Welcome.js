import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

import { Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, CircularProgress, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ApiHighlight } from '../../Highlights/Highlight';

const { validIdHelper } = require('../../../tools');



export function Welcome({ lookerContent, classes, onClick, userProfile, lookerUser }) {
  // console.log('Welcome')

  useEffect(() => {
    // setClientSideCode(rawSampleCode)
  }, [lookerContent, lookerUser]);

  return (
    <div
      className={` ${classes.maxHeight400}`}
    >
      <Typography variant="h5" >
        Welcome back, <b>{userProfile.givenName} & {lookerUser.user_attributes.brand}!</b>
      </Typography>

      <Typography variant="subtitle1" display="inline">
        <b><i>atom</i> fashion</b> build an atomic connection with your customers
      </Typography>
      <Divider className={`${classes.divider} ${classes.mb12} ${classes.mt12}`} />
      <Typography variant="h6" >
        Latest content for you
      </Typography>

      <Carousel>
        <div>
          <img src={require(`../../../images/blog.jpg`)} />
          <p className="legend">Blog</p>
        </div>
        <div>
          <img src={require(`../../../images/inventory.jpg`)} />
          <p className="legend">Inventory Best Practices</p>
        </div>
        <div>
          <img src={require(`../../../images/macro.jpg`)} />
          <p className="legend">Macro Trends</p>
        </div>
      </Carousel>
    </div >
  );
}
