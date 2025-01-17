import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid } from '@material-ui/core'
import { Loader, CodeFlyout } from './Accessories'
import { appContextMap, validIdHelper } from '../utils/tools';
import { useStyles } from './styles.js';

export const SplashPage = ({ staticContent, dynamicPadding }) => {
  const { clientSession: { lookerUser, lookerHost, drawerOpen } } = useContext(appContextMap[process.env.REACT_APP_PACKAGE_NAME])
  const dynamicTopBarBottomBarHeight = dynamicPadding - 400;
  const [iFrameExists] = useState(1);
  const [height, setHeight] = useState((window.innerHeight - dynamicTopBarBottomBarHeight));
  const { lookerContent, type } = staticContent;
  const classes = useStyles();
  const demoComponentType = type || 'code flyout';

  // console.log({ classes })
  useEffect(() => {
    window.addEventListener("resize", () => setHeight((window.innerHeight - dynamicTopBarBottomBarHeight)));
  })

  useEffect(() => {
    setHeight((window.innerHeight - dynamicTopBarBottomBarHeight));
  }, [drawerOpen])

  return (
    <div
      className={`${classes.root} ${classes.positionRelative}`}
      // style={{ height }}
    >
      <div
        className={`
        ${classes.height100Percent} 
        ${classes.overflowScroll}
        ${classes.padding15}`}
      >
        <Grid
          container
          spacing={3}
        >

          <Loader
            hide={iFrameExists}
            classes={classes}
            height={height} />

          <Box className={iFrameExists ? `` : `${classes.hidden}`}>
            <Grid container>
              <Grid item xs={10}>
                <Grid container
                  spacing={3}
                  key={`${validIdHelper(demoComponentType + '-outerFragment')}`}
                  className={`${classes.overflowScroll}`}
                >
                  <CodeFlyout
                    classes={classes}
                    lookerUser={lookerUser}
                    height={height}
                    staticContent={staticContent}
                  />

                  {lookerContent.map((lookerContentItem, innerIndex) => {
                    const ComponentToRender = lookerContentItem.component
                    return (
                      <Grid
                        key={`${validIdHelper(demoComponentType + '-innerFragment-' + innerIndex)}`}
                        item
                        sm={parseInt(lookerContentItem.gridWidth) || "auto"}
                      >
                        {ComponentToRender ? <ComponentToRender {...{ lookerContentItem, classes, demoComponentType, lookerHost }} /> : ""}
                      </Grid>
                    )
                  })}
                </Grid>
                </Grid>
            </Grid>
          </Box>
        </Grid>
      </div>
    </div>
  )
}
