import React from 'react';
import { Typography, Grid, TextField } from '@material-ui/core'
import { ApiHighlight } from '../../Highlights/Highlight';
import { NumberToColoredPercent } from '../../Accessories/NumberToColoredPercent';
import { Autocomplete } from '@material-ui/lab'

const { validIdHelper } = require('../../../tools');


export default function AutoComplete({ lookerContent, apiContent, index, classes, customFilterAction, type }) {
  return (
    <Grid item sm={3}>
      <ApiHighlight classes={classes}
        key={validIdHelper(`dashEmbed-${type}${lookerContent.id}-${index}`)} >
        <Typography
        >Filter By Product:</Typography>
        <Autocomplete
          id={`combo-box-dashboard-${lookerContent.id}`}
          options={Array.isArray(apiContent[index]) ?
            apiContent[index] :
            []}
          renderOption={(option) => (
            <Grid container justify="space-between">
              <Grid item >
                {option.label}
              </Grid>
              {option.trend && <Grid item>
                <NumberToColoredPercent
                  val={option.trend}
                  positive_good={true}
                  abs_val={Math.abs(option.trend)}
                />
              </Grid>}
            </Grid>
          )}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => {
            customFilterAction(lookerContent[0].id,
              lookerContent[0].filters[index].filterName,
              (newValue) ? newValue.label : '')
          }}
          renderInput={(params) => <TextField {...params}
            label={lookerContent[0].filters[index].filterName}
            variant="outlined"
          />}
          loadingText="Loading..."
        />
      </ApiHighlight>
    </Grid>
  )
}
