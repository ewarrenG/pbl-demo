import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Hidden, IconButton, Box } from '@material-ui/core'
import { ExpandMore, FilterList, VerticalSplit, HorizontalSplit, ChevronLeft, Menu } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab'




import AutoComplete from './AutoComplete'
import MapFilter from './MapFilter'
import RangeSlider from './RangeSlider'
import ToggleApi from './ToggleApi'
import ToggleTile from './ToggleTile'
import ToggleVisColor from './ToggleVisColor'
import SwitchTheme from './SwitchTheme'
import SelectFont from './SelectFont'
import FilterBarChildren from './FilterBarChildren'

const { validIdHelper } = require('../../../tools');



export default function FilterBar(props) {
  const { staticContent, staticContent: { lookerContent }, staticContent: { type }, classes,
    apiContent, customFilterAction, tileToggleValue, handleTileToggle, visColorToggleValue,
    handleVisColorToggle, lightThemeToggleValue, fontThemeSelectValue, handleThemeChange,
    horizontalLayout, setHorizontalLayout, drawerOpen, setDrawerOpen
  } = props;

  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!expanded) setExpanded(true)
  }, [horizontalLayout])


  return (
    <Grid item
      sm={horizontalLayout ? 12 : drawerOpen ? 3 : ''}
      key={validIdHelper(`${type}-FilterBar-${lookerContent[0].id}`)}>
      {apiContent ?
        <Accordion
          expanded={expanded}
          className={`${classes.w100} MuiExpansionPanel-root`}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={horizontalLayout ? <ExpandMore onClick={() => {
              setExpanded(!expanded)
            }} /> : ''}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {horizontalLayout ?
              <VerticalSplit
                onClick={(e) => {
                  setHorizontalLayout(!horizontalLayout)
                }}
              />
              :
              <>
                {drawerOpen ?
                  <>
                    <ChevronLeft
                      onClick={() => setDrawerOpen(!drawerOpen)} />
                    <HorizontalSplit
                      onClick={(e) => {
                        setExpanded(true)
                        setHorizontalLayout(!horizontalLayout)
                      }} />
                  </> :
                  <Menu
                    onClick={() => setDrawerOpen(!drawerOpen)} />}
              </>}
            {drawerOpen ?
              <>
                <FilterList className={classes.ml12} />
                <Typography className={`${classes.heading} ${classes.ml12}`}>Filter:</Typography>
              </> : ''}

          </AccordionSummary>
          <Box display={drawerOpen ? "block" : "none"}>
            <AccordionDetails >
              <FilterBarChildren {...props}
                classes={classes}
                apiContent={apiContent}
                customFilterAction={customFilterAction}
                tileToggleValue={tileToggleValue}
                handleTileToggle={handleTileToggle}
                visColorToggleValue={visColorToggleValue}
                handleVisColorToggle={handleVisColorToggle}
                lightThemeToggleValue={lightThemeToggleValue}
                fontThemeSelectValue={fontThemeSelectValue}
                handleThemeChange={handleThemeChange}
                horizontalLayout={horizontalLayout}
                setHorizontalLayout={setHorizontalLayout}
                lookerContent={lookerContent}
                type={type}
              />
            </AccordionDetails>
          </Box>

        </Accordion >
        :
        <Skeleton variant="rect" animation="wave" className={classes.skeleton} />}
    </Grid>
  )
}


